const BASE_URL = 'http://localhost:5000/api/v1/auth';

export const getSessionTokens = () => {
  return {
    accessToken: localStorage.getItem('xeno_access_token'),
    refreshToken: localStorage.getItem('xeno_refresh_token'),
  };
};

export const setSessionTokens = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem('xeno_access_token', accessToken);
  if (refreshToken) localStorage.setItem('xeno_refresh_token', refreshToken);
};

export const clearSessionTokens = () => {
  localStorage.removeItem('xeno_access_token');
  localStorage.removeItem('xeno_refresh_token');
};

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((cb) => cb(accessToken));
  refreshSubscribers = [];
};

async function baseRequest(path, options = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const { accessToken } = getSessionTokens();
  if (accessToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return { success: true };
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    // If it's a validation error or standard problem+json, throw the detailed message
    const errorMsg = data.detail || data.title || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function apiRequest(path, options = {}) {
  try {
    return await baseRequest(path, options);
  } catch (error) {
    // Check if error is 401 and we have a refresh token to attempt rotation
    const { refreshToken } = getSessionTokens();
    if (error.status === 401 && refreshToken && !options._retry) {
      options._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshData = await baseRequest('/refresh', {
            method: 'POST',
            body: JSON.stringify({ refreshToken }),
          });
          if (refreshData.success && refreshData.accessToken) {
            setSessionTokens(refreshData.accessToken, refreshData.refreshToken);
            onTokenRefreshed(refreshData.accessToken);
            isRefreshing = false;
          } else {
            throw new Error('Refresh failed');
          }
        } catch (refreshErr) {
          clearSessionTokens();
          isRefreshing = false;
          window.dispatchEvent(new Event('xeno_auth_expired'));
          throw refreshErr;
        }
      }

      // Queue the original request until token is refreshed
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newAccessToken) => {
          options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${newAccessToken}`,
          };
          resolve(baseRequest(path, options));
        });
      });
    }
    throw error;
  }
}

// Authentication API Actions
export const authAPI = {
  signup: (userData) => {
    return apiRequest('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  verifyEmail: (token) => {
    return apiRequest(`/verify-email?token=${encodeURIComponent(token)}`, {
      method: 'POST',
    });
  },

  login: (credentials) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getMe: () => {
    return apiRequest('/me', {
      method: 'GET',
    });
  },

  forgotPassword: (email) => {
    return apiRequest('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: (token, password) => {
    return apiRequest('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  },

  logout: () => {
    return apiRequest('/logout', {
      method: 'POST',
    }).finally(() => {
      clearSessionTokens();
    });
  },

  logoutAll: () => {
    return apiRequest('/logout-all', {
      method: 'POST',
    }).finally(() => {
      clearSessionTokens();
    });
  },
};

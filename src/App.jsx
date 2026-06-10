import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import AuthPage from './components/Auth/AuthPage';

import { authAPI, getSessionTokens, clearSessionTokens } from './utils/api';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'auth' | 'dashboard'
  const [authSubView, setAuthSubView] = useState('login');
  const [user, setUser] = useState(null);

  // Restore authenticated session on startup
  useEffect(() => {
    const checkSession = async () => {
      const { accessToken } = getSessionTokens();
      if (accessToken) {
        try {
          const data = await authAPI.getMe();
          if (data.success && data.user) {
            setUser(data.user);
            setCurrentView('dashboard');
          }
        } catch (err) {
          console.warn("Session expired or API server offline. Continuing in default state.", err);
          clearSessionTokens();
        }
      }
    };

    // Route to verification / reset if path is present in URL
    const path = window.location.pathname;
    if (path === '/verify-email' || path === '/reset-password') {
      setCurrentView('auth');
    } else {
      checkSession();
    }
  }, []);

  // Listen for session expiration events from API interceptor
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setCurrentView('auth');
      setAuthSubView('login');
      clearSessionTokens();
    };
    window.addEventListener('xeno_auth_expired', handleAuthExpired);
    return () => window.removeEventListener('xeno_auth_expired', handleAuthExpired);
  }, []);

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("API logout error, clearing local token session", err);
    } finally {
      setUser(null);
      clearSessionTokens();
      setCurrentView('landing');
      // Clean path in address bar
      window.history.replaceState({}, document.title, '/');
    }
  };

  return (
    <div className="w-full min-h-screen">
      {currentView === 'landing' && (
        <LandingPage 
          onLaunch={() => {
            // Check if we are already logged in
            const { accessToken } = getSessionTokens();
            if (accessToken && user) {
              setCurrentView('dashboard');
            } else {
              setAuthSubView('login');
              setCurrentView('auth');
            }
          }} 
        />
      )}

      {currentView === 'auth' && (
        <AuthPage 
          initialView={authSubView}
          onAuthSuccess={handleAuthSuccess}
          onBackToLanding={() => {
            setCurrentView('landing');
            window.history.replaceState({}, document.title, '/');
          }}
        />
      )}

      {currentView === 'dashboard' && (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="mb-8">Welcome, {user?.name || 'User'}!</p>
          <button onClick={handleLogout} className="px-6 py-2 bg-[#6b4cff] text-white rounded-md font-medium hover:bg-[#5a3dea] transition-colors">Logout</button>
        </div>
      )}
    </div>
  );
}


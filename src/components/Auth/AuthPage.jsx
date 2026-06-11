import React, { useState, useEffect } from 'react';
import { authAPI, setSessionTokens } from '../../utils/api';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthPage({ initialView = 'login', onAuthSuccess, onBackToLanding }) {
  const location = useLocation();
  const navigate = useNavigate();
  // Use state from location if available, otherwise fallback to prop
  const [view, setView] = useState(location.state?.initialView || initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: '' }
  const [token, setToken] = useState(''); // Used for URL verification / reset password

  // Capture token from URL if present and update view if location state changes
  useEffect(() => {
    if (location.state?.initialView) {
      setView(location.state.initialView);
    }

    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');

    // Detect path-based routing triggers (legacy fallback, normally handled by App.jsx redirects now)
    const path = window.location.pathname;
    if (path === '/verify-email' || location.state?.initialView === 'verify-email') {
      setView('verify-email');
      if (urlToken) {
        setToken(urlToken);
        handleAutoVerifyEmail(urlToken);
      }
    } else if (path === '/reset-password' || location.state?.initialView === 'reset-password') {
      setView('reset-password');
      if (urlToken) {
        setToken(urlToken);
      }
    }
  }, [location.state, location.pathname]);

  const triggerAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleAutoVerifyEmail = async (verifyToken) => {
    setLoading(true);
    try {
      const res = await authAPI.verifyEmail(verifyToken);
      if (res.success) {
        triggerAlert('success', 'Email verified successfully! You can now log in.');
        setView('login');
      }
    } catch (err) {
      triggerAlert('error', err.message || 'Verification failed. Token may be expired.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = async (e) => {
    e.preventDefault();
    if (!token) return triggerAlert('error', 'Please enter a verification token.');
    await handleAutoVerifyEmail(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return triggerAlert('error', 'Please fill in all fields.');

    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setSessionTokens(res.accessToken, res.refreshToken);
        triggerAlert('success', 'Welcome back!');
        // Small delay to show the nice login alert
        setTimeout(() => {
          onAuthSuccess(res.user);
        }, 800);
      }
    } catch (err) {
      console.error(err);
      triggerAlert('error', err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      return triggerAlert('error', 'Please fill in all required fields.');
    }

    setLoading(true);
    try {
      const res = await authAPI.signup({
        email,
        password,
        firstName,
        lastName,
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}`,
      });
      if (res.success) {
        triggerAlert('success', 'Account created! Please check your email to verify.');
        // Show verification token prompt for local dev testing
        setView('verify-email');
      }
    } catch (err) {
      triggerAlert('error', err.message || 'Registration failed. Email might be in use.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return triggerAlert('error', 'Please enter your email.');

    setLoading(true);
    try {
      const res = await authAPI.forgotPassword(email);
      if (res.success) {
        triggerAlert('success', res.message || 'Password reset link sent to your email.');
        setView('login');
      }
    } catch (err) {
      triggerAlert('error', err.message || 'Failed to request reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token || !password) return triggerAlert('error', 'Please fill in all fields.');

    setLoading(true);
    try {
      const res = await authAPI.resetPassword(token, password);
      if (res.success) {
        triggerAlert('success', 'Password reset successful! You can now log in.');
        setView('login');
        // Clean URL params
        window.history.replaceState({}, document.title, '/');
      }
    } catch (err) {
      triggerAlert('error', err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handleBypassDemo = () => {
    const mockUser = {
      id: "demo-user-123",
      email: "demo@xeno.ai",
      firstName: "Sarah",
      lastName: "Jenkins",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      role: "ADMIN",
      status: "ACTIVE",
      isEmailVerified: true,
    };
    // Set dummy tokens so session persists on reload
    setSessionTokens('demo_access_token', 'demo_refresh_token');
    
    triggerAlert('success', 'Welcome to Xeno AI Campaign Console (Demo Mode)!');
    setTimeout(() => {
      onAuthSuccess(mockUser);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] bg-grid-pattern relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto select-none">
      
      {/* Dynamic Alert Banner */}
      {alert && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 font-bold text-xs border animate-in slide-in-from-top duration-300 ${
          alert.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
            : 'bg-rose-50 border-rose-100 text-rose-700'
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {alert.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span>{alert.message}</span>
        </div>
      )}

      {/* Organic Blobs Background */}
      <div className="blob bg-indigo-400/20 w-[400px] h-[400px] rounded-full -top-12 -left-12 mix-blend-multiply pointer-events-none" />
      <div className="blob bg-pink-300/25 w-[500px] h-[500px] rounded-full -bottom-16 right-12 mix-blend-multiply pointer-events-none" style={{ animationDelay: '-5s' }} />

      {/* Back to landing */}
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 bg-white/70 hover:bg-white backdrop-blur-md transition-all font-semibold text-xs shadow-sm hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Home
        </button>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white/80 border border-gray-200/50 rounded-2xl shadow-md backdrop-blur-md mb-4">
            <img 
              alt="Xeno AI Logo" 
              className="h-10 w-10 object-contain drop-shadow-md" 
              src="data:image/png;base64,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" 
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Xeno AI Strategist</h2>
          <p className="mt-2 text-sm text-gray-600">
            {view === 'login' && 'Sign in to launch your AI campaigns'}
            {view === 'signup' && 'Create your free creator account'}
            {view === 'forgot-password' && 'Enter your email to reset password'}
            {view === 'reset-password' && 'Enter your new secure password'}
            {view === 'verify-email' && 'Verify your account registration'}
          </p>
        </div>

        {/* Premium Card Glass container */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          {/* 1. LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@xeno.com"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                  <button 
                    type="button"
                    onClick={() => setView('forgot-password')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">lock</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full creative-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. SIGNUP VIEW */}
          {view === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Dev"
                    className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="User"
                    className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@xeno.com"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">lock</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="SecurePassword123!"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Avatar URL (Optional)</label>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full creative-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD VIEW */}
          {view === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <p className="text-xs text-gray-500 leading-relaxed">
                Provide your registration email address and we'll generate a recovery token to reset your password.
              </p>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@xeno.com"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full creative-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <>
                    <span>Send Reset Request</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 4. RESET PASSWORD VIEW */}
          {view === 'reset-password' && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Verification Reset Token</label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter the copied reset token hex"
                  className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">New Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-gray-400">lock</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full creative-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <>
                    <span>Submit New Password</span>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 5. VERIFY EMAIL VIEW */}
          {view === 'verify-email' && (
            <form onSubmit={handleManualVerify} className="space-y-5">
              <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                <p className="text-xs text-indigo-700 leading-relaxed font-semibold">
                  We've dispatched a registration handshake to your email.
                  If you do not have SMTP setup, retrieve the token from your Postgres `EmailVerificationToken` table (e.g. via Prisma Studio) and paste it below.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Verification Hex Token</label>
                <input
                  type="text"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="e.g. 5fb473..."
                  className="w-full px-4 py-3 text-sm bg-gray-50/50 border border-gray-200/80 rounded-xl focus:bg-white focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full creative-btn py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                ) : (
                  <>
                    <span>Verify Account</span>
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer View Toggle Links */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col items-center gap-3">
            {view === 'login' && (
              <p className="text-xs text-gray-500 font-semibold">
                Don't have an account?{' '}
                <button onClick={() => setView('signup')} className="text-indigo-650 font-bold hover:underline">
                  Sign Up
                </button>
              </p>
            )}
            {view === 'signup' && (
              <p className="text-xs text-gray-500 font-semibold">
                Already registered?{' '}
                <button onClick={() => setView('login')} className="text-indigo-650 font-bold hover:underline">
                  Log In
                </button>
              </p>
            )}
            {view !== 'login' && view !== 'signup' && (
              <button onClick={() => setView('login')} className="text-xs text-indigo-650 font-bold hover:underline">
                Back to Sign In
              </button>
            )}

            {/* Developer Offline Bypass Fallback - always visible inside the card */}
            <div className="w-full mt-2 pt-4 border-t border-dashed border-gray-200">
              <p className="text-[10px] text-gray-400 font-semibold text-center mb-2">No backend? Try demo mode</p>
              <button 
                id="bypass-demo-btn"
                onClick={handleBypassDemo}
                className="w-full text-xs text-indigo-600 font-bold px-4 py-2.5 border border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl shadow-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[14px]">play_circle</span>
                Bypass to Dashboard (Demo Mode)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

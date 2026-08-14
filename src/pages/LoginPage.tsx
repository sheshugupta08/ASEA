import React, { useState } from 'react';
import { PageType } from '../types';
import { AuthBrandingPanel } from '../components/AuthBrandingPanel';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: PageType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onAddToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Form Validation
  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (!email.trim()) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address (e.g. engineer@asea.dev).');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage('');

    // Simulate API authentication call
    setTimeout(() => {
      setIsLoading(false);

      // Simple demo check for invalid demo trigger
      if (email.toLowerCase() === 'error@asea.dev') {
        setErrorMessage('Invalid credentials. Please double check your email and password.');
        onAddToast('Authentication Failed', 'Invalid email or password combination.', 'error');
        return;
      }

      onAddToast('Welcome back!', `Signed in as ${email}`, 'success');
      onNavigate('dashboard');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onAddToast('Google OAuth Success', 'Signed in with Google account', 'success');
      onNavigate('dashboard');
    }, 1200);
  };

  const handleQuickDemoFill = () => {
    setEmail('engineer@asea.dev');
    setPassword('aseaPass123!');
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');
    onAddToast('Demo Credentials Filled', 'Click "Sign In" to proceed', 'info');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-[#e3e2e8]">
      {/* Form Container (Full Width on Mobile, Left Half on Desktop) */}
      <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-16 my-auto max-w-xl mx-auto w-full">
        {/* Mobile / Compact Brand Header */}
        <div className="w-full text-left space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 bg-black rotate-45" />
            </div>
            <div>
              <span className="font-mono text-xl font-bold tracking-widest text-white block">ASEA</span>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                Autonomous Software Engineering Agent
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Sign in to <span className="italic font-serif font-normal text-zinc-300">ASEA Swarm</span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Access AI agent swarms, automated AST fixes, and code generation.
            </p>
          </div>
        </div>

        {/* Global Error Banner if Authentication Fails */}
        {errorMessage && (
          <div className="w-full mb-6 p-3.5 bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block">Sign In Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="w-full space-y-5" noValidate>
          {/* Email Input Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-email" className="block text-xs font-mono text-zinc-300 font-medium">
                Work Email <span className="text-emerald-400">*</span>
              </label>
              {emailError && (
                <span className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="engineer@company.com"
                className={`w-full min-h-[48px] pl-10 pr-4 py-3 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  emailError
                    ? 'border-red-500/80 focus:border-red-400'
                    : 'border-white/10 focus:border-white'
                }`}
              />
            </div>
          </div>

          {/* Password Input Field with Toggle */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="block text-xs font-mono text-zinc-300 font-medium">
                Password <span className="text-emerald-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="••••••••••••"
                className={`w-full min-h-[48px] pl-10 pr-12 py-3 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  passwordError
                    ? 'border-red-500/80 focus:border-red-400'
                    : 'border-white/10 focus:border-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-mono text-zinc-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded-none bg-black border border-white/20 checked:bg-white checked:border-white accent-white focus:ring-0 cursor-pointer"
              />
              <span>Remember me for 30 days</span>
            </label>

            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 uppercase tracking-wider underline cursor-pointer"
            >
              Fill Demo User
            </button>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full min-h-[48px] bg-white text-black text-xs font-bold font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#050505] text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Or continue with
            </span>
          </div>

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full min-h-[48px] bg-black border border-white/15 text-xs font-mono text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
          >
            {isGoogleLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Connecting Google...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div className="w-full text-center pt-8 border-t border-white/10 mt-8">
          <p className="text-xs font-mono text-zinc-400">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="text-white font-bold hover:underline ml-1 underline-offset-4"
            >
              Create Account &rarr;
            </button>
          </p>
        </div>
      </div>

      {/* Desktop AI-themed Branding / Illustration Panel */}
      <AuthBrandingPanel mode="login" />
    </div>
  );
};

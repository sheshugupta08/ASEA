import React, { useState } from 'react';
import { PageType } from '../types';
import { AuthBrandingPanel } from '../components/AuthBrandingPanel';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: PageType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate, onAddToast }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  // Password strength logic
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-zinc-800' };
    if (password.length < 6) return { label: 'Too short', color: 'bg-red-500' };
    if (password.length < 10) return { label: 'Fair', color: 'bg-amber-400' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { label: 'Strong', color: 'bg-emerald-400' };
    }
    return { label: 'Good', color: 'bg-cyan-400' };
  };

  const strength = getPasswordStrength();

  const validate = () => {
    let isValid = true;
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');

    if (!fullName.trim()) {
      setFullNameError('Full name is required.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!acceptedTerms) {
      setTermsError('You must agree to the Terms of Service & Privacy Policy.');
      isValid = false;
    }

    return isValid;
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAddToast('Account Created!', `Welcome to ASEA, ${fullName}`, 'success');
      onNavigate('dashboard');
    }, 1200);
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onAddToast('Google OAuth Success', 'Created ASEA account via Google', 'success');
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-[#e3e2e8]">
      {/* Form Area */}
      <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-16 my-auto max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="w-full text-left space-y-3 mb-6">
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
              Create your <span className="italic font-serif font-normal text-zinc-300">ASEA account</span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Start building, testing, and auto-patching code with AI agent swarms.
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignupSubmit} className="w-full space-y-4" noValidate>
          {/* Full Name */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="signup-name" className="block text-xs font-mono text-zinc-300 font-medium">
                Full Name <span className="text-emerald-400">*</span>
              </label>
              {fullNameError && (
                <span className="text-[11px] font-mono text-red-400">{fullNameError}</span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <input
                id="signup-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fullNameError) setFullNameError('');
                }}
                placeholder="e.g. Sarah Connor"
                className={`w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  fullNameError ? 'border-red-500' : 'border-white/10 focus:border-white'
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="signup-email" className="block text-xs font-mono text-zinc-300 font-medium">
                Work Email Address <span className="text-emerald-400">*</span>
              </label>
              {emailError && (
                <span className="text-[11px] font-mono text-red-400">{emailError}</span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="sarah@company.com"
                className={`w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  emailError ? 'border-red-500' : 'border-white/10 focus:border-white'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="signup-password" className="block text-xs font-mono text-zinc-300 font-medium">
                Password <span className="text-emerald-400">*</span>
              </label>
              {strength.label && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Strength: <span className="text-white font-bold">{strength.label}</span>
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                placeholder="Minimum 8 characters"
                className={`w-full min-h-[48px] pl-10 pr-12 py-2.5 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  passwordError ? 'border-red-500' : 'border-white/10 focus:border-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordError ? (
              <p className="text-[11px] font-mono text-red-400">{passwordError}</p>
            ) : (
              password && (
                <div className="w-full h-1 bg-zinc-900 mt-1.5 overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength.color} w-full`} />
                </div>
              )
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="signup-confirm-password" className="block text-xs font-mono text-zinc-300 font-medium">
                Confirm Password <span className="text-emerald-400">*</span>
              </label>
              {confirmPasswordError && (
                <span className="text-[11px] font-mono text-red-400">{confirmPasswordError}</span>
              )}
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError('');
                }}
                placeholder="Re-enter password"
                className={`w-full min-h-[48px] pl-10 pr-12 py-2.5 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                  confirmPasswordError ? 'border-red-500' : 'border-white/10 focus:border-white'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="pt-2 space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs font-mono text-zinc-400 select-none">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (termsError) setTermsError('');
                }}
                className="w-4 h-4 mt-0.5 rounded-none bg-black border border-white/20 checked:bg-white checked:border-white cursor-pointer"
              />
              <span className="leading-snug">
                I agree to ASEA's{' '}
                <a href="#terms" onClick={(e) => e.preventDefault()} className="text-white underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-white underline">
                  Privacy Policy
                </a>.
              </span>
            </label>
            {termsError && (
              <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {termsError}
              </p>
            )}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full min-h-[48px] bg-white text-black text-xs font-bold font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative py-1 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#050505] text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Or
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
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
                <span>Sign up with Google</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="w-full text-center pt-6 border-t border-white/10 mt-6">
          <p className="text-xs font-mono text-zinc-400">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-white font-bold hover:underline ml-1 underline-offset-4"
            >
              Sign In &rarr;
            </button>
          </p>
        </div>
      </div>

      {/* Desktop Panel */}
      <AuthBrandingPanel mode="signup" />
    </div>
  );
};

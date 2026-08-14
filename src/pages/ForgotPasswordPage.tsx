import React, { useState } from 'react';
import { PageType } from '../types';
import { AuthBrandingPanel } from '../components/AuthBrandingPanel';
import { 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Send 
} from 'lucide-react';

interface ForgotPasswordPageProps {
  onNavigate: (page: PageType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate, onAddToast }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    setEmailError('');
    if (!email.trim()) {
      setEmailError('Email address is required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      onAddToast('Reset Link Sent', `Sent password reset email to ${email}`, 'success');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full grid grid-cols-1 lg:grid-cols-2 bg-[#050505] text-[#e3e2e8]">
      {/* Form Container */}
      <div className="flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-16 my-auto max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="w-full text-left space-y-3 mb-8">
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </button>

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
              Reset your <span className="italic font-serif font-normal text-zinc-300">password</span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Enter your registered work email to receive a secure recovery link.
            </p>
          </div>
        </div>

        {/* Confirmation State if Email Sent */}
        {isSent ? (
          <div className="w-full bg-zinc-950 border border-emerald-500/40 p-6 space-y-4 animate-in fade-in">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold font-mono text-white uppercase">Reset Link Dispatched</h3>
              <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                We sent a signed password reset link to <span className="text-emerald-400 font-bold">{email}</span>.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
              <p className="text-[11px]">
                Didn't receive the email? Check your spam folder or re-trigger link dispatch.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    onAddToast('Resend Link', 'You can now enter your email again.', 'info');
                  }}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors uppercase font-bold text-[10px]"
                >
                  Resend Link
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-zinc-400 hover:text-white underline text-[11px]"
                >
                  Return to Login
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Forgot Password Form */
          <form onSubmit={handleResetSubmit} className="w-full space-y-5" noValidate>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="reset-email" className="block text-xs font-mono text-zinc-300 font-medium">
                  Registered Email Address <span className="text-emerald-400">*</span>
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
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="engineer@company.com"
                  className={`w-full min-h-[48px] pl-10 pr-4 py-3 bg-black border text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                    emailError ? 'border-red-500' : 'border-white/10 focus:border-white'
                  }`}
                />
              </div>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">
                Password reset instructions will expire in 15 minutes.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full min-h-[48px] bg-white text-black text-xs font-bold font-mono uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="w-full text-center pt-8 border-t border-white/10 mt-8">
          <button
            onClick={() => onNavigate('login')}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            Remember your password? <span className="text-white font-bold underline ml-1">Sign In</span>
          </button>
        </div>
      </div>

      {/* Desktop Panel */}
      <AuthBrandingPanel mode="forgot-password" />
    </div>
  );
};

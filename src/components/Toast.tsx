import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-[#45a1ff]" />;
        let borderClass = 'border-[#45a1ff]/30 bg-[#121317]/90';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#3cdcd1]" />;
          borderClass = 'border-[#3cdcd1]/40 bg-[#121317]/95 shadow-[0_0_15px_rgba(60,220,209,0.15)]';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-[#ffb4ab]" />;
          borderClass = 'border-[#ffb4ab]/40 bg-[#121317]/95 shadow-[0_0_15px_rgba(255,180,171,0.15)]';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />;
          borderClass = 'border-[#f59e0b]/40 bg-[#121317]/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border backdrop-blur-xl flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${borderClass}`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-mono text-xs font-semibold text-[#e3e2e8]">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-[#c0c7d4] mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#8a919d] hover:text-[#e3e2e8] p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

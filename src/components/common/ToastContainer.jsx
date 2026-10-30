import React from 'react';
import { useCar } from '../../context/CarContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer = () => {
  const { toasts, removeToast } = useCar();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isWarning = toast.type === 'warning';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
                isSuccess
                  ? 'bg-neutral-900/90 border-amber-500/40 text-neutral-100 shadow-glow-gold'
                  : isWarning
                  ? 'bg-neutral-900/90 border-red-500/40 text-neutral-100 shadow-glow-red'
                  : 'bg-neutral-900/90 border-cyan-500/40 text-neutral-100 shadow-glow-cyan'
              }`}
            >
              <div className="mt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {!isSuccess && !isWarning && <Info className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className="flex-1 pr-2">
                <div className="text-sm font-semibold tracking-wide text-neutral-100">
                  {toast.title}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  {toast.message}
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-neutral-500 hover:text-neutral-200 transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};


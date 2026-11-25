import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Shared confirmation dialog. Mirrors the project's modal pattern
 * (see pages/dashboard/Itinerary.jsx): navy-blur backdrop that closes on
 * click, white rounded panel with a subtle scale/fade/y entrance & exit,
 * and an X close button. Also closes on the Escape key.
 *
 * Usage:
 *   <ConfirmDialog
 *     open={showSignOut}
 *     onClose={() => setShowSignOut(false)}
 *     onConfirm={handleSignOut}
 *     title="Are you sure you want to sign out?"
 *     message="You'll be signed out of this device."
 *     confirmText="Sign Out"
 *     cancelText="Cancel"
 *     icon={<LogOut className="w-6 h-6" />}
 *   />
 *
 * The confirm action is only ever fired from onConfirm — render the dialog
 * purely for confirmation, so nothing is triggered by Cancel / backdrop /
 * Escape / X.
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon,
  danger = true,
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white dark:bg-navy-900 rounded-3xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-navy-400" />
            </button>

            <div className="text-center">
              {icon && (
                <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${danger ? 'bg-red-50 dark:bg-red-500/10' : 'bg-voyage-50 dark:bg-voyage-500/10'}`}>
                  <span className={danger ? 'text-red-500' : 'text-voyage-500'}>{icon}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{title}</h3>
              {message && <p className="text-sm text-navy-400 leading-relaxed">{message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={onClose}
                className="btn-secondary w-full"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 ${
                  danger
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-500'
                    : 'bg-gradient-to-r from-voyage-600 to-voyage-500 text-white hover:from-voyage-700 hover:to-voyage-600'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

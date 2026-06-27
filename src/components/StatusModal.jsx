import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useHabits } from '../hooks/useHabits';

export default function StatusModal() {
  const { statusMessage, clearStatusMessage } = useHabits();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (statusMessage) {
      setVisible(true);
      if (statusMessage.type === 'SUCCESS') {
        const duration = 2 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      }
    }
  }, [statusMessage]);

  if (!statusMessage) return null;

  const isSuccess = statusMessage.type === 'SUCCESS';
  const title = isSuccess ? '🎉 Giornata Perfetta!' : '😔 Peccato...';
  const message = isSuccess
    ? 'Hai completato tutte le abitudini! Continua così!'
    : statusMessage.message;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={clearStatusMessage}
      >
        <motion.div
          className="relative max-w-sm w-full mx-4 p-8 rounded-3xl shadow-2xl bg-white dark:bg-gray-800"
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 40 }}
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center mb-3 text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          <button
            onClick={clearStatusMessage}
            className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
          >
            Ho capito!
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
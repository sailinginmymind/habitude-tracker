import { motion } from 'framer-motion';
import { useHabits } from '../hooks/useHabits';

export default function StreakCounter() {
  const { streak } = useHabits();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow-sm border border-gray-100 dark:border-gray-700">
      <span className="text-2xl" role="img" aria-label="fuoco">🔥</span>
      <motion.span
        key={streak}
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-2xl font-bold text-gray-800 dark:text-white"
      >
        {streak}
      </motion.span>
      <span className="text-sm text-gray-500 dark:text-gray-400">giorni perfetti</span>
    </div>
  );
}
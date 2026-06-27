import { motion } from 'framer-motion';
import { useHabits } from '../hooks/useHabits';
import { getTodayDateString } from '../utils/dateUtils';

export default function HabitItem({ habit }) {
  const { dailyLogs, toggleHabit, deleteHabit } = useHabits();
  const today = getTodayDateString();
  const todayLog = dailyLogs.find(log => log.date === today);
  const completed = todayLog ? todayLog.completedHabits.includes(habit.id) : false;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleHabit(habit.id)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
            completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          aria-label={completed ? 'Completata' : 'Da fare'}
        >
          {completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </motion.svg>
          )}
        </button>
        <span className={`text-lg ${completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'}`}>
          {habit.name}
        </span>
      </div>
      <button
        onClick={() => deleteHabit(habit.id)}
        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
        aria-label="Elimina abitudine"
        title="Elimina"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.div>
  );
}
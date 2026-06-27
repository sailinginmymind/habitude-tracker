import { AnimatePresence } from 'framer-motion';
import { useHabits } from '../hooks/useHabits';
import HabitItem from './HabitItem';
import { getTodayDateString } from '../utils/dateUtils';

export default function HabitList() {
  const { habits, dailyLogs } = useHabits();
  const today = getTodayDateString();
  const todayLog = dailyLogs.find(log => log.date === today);
  const completedIds = todayLog ? new Set(todayLog.completedHabits) : new Set();

  const pendingHabits = habits.filter(h => !completedIds.has(h.id));
  const completedHabits = habits.filter(h => completedIds.has(h.id));

  if (habits.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 dark:text-gray-500 text-lg">
          Nessuna abitudine ancora. Aggiungine una!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Box Da fare */}
      <div>
        <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-3">
          Da fare ({pendingHabits.length})
        </h2>
        {pendingHabits.length === 0 ? (
          <p className="text-center text-green-600 dark:text-green-400 py-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            🎉 Hai completato tutto per oggi!
          </p>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {pendingHabits.map(habit => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Box Completate */}
      {completedHabits.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-3">
            Completate ({completedHabits.length})
          </h2>
          <div className="space-y-3 opacity-80">
            <AnimatePresence>
              {completedHabits.map(habit => (
                <HabitItem key={habit.id} habit={habit} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
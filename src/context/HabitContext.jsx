import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getTodayDateString, isBefore } from '../utils/dateUtils';
import { loadState, saveState } from '../utils/storage';

export const HabitContext = createContext(null);

const initialState = {
  habits: [],
  dailyLogs: [],
  streak: 0,
  statusMessage: null,
};

export function HabitProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = loadState();
    return saved ? { ...initialState, ...saved } : initialState;
  });

  const { habits, dailyLogs, streak, statusMessage } = state;

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    const today = getTodayDateString();
    const unclosedPastLogs = dailyLogs
      .filter(log => isBefore(log.date, today) && !log.isClosed)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (unclosedPastLogs.length === 0) {
      const todayLogExists = dailyLogs.some(log => log.date === today);
      if (!todayLogExists) {
        setState(prev => ({
          ...prev,
          dailyLogs: [...prev.dailyLogs, { date: today, completedHabits: [], isClosed: false }]
        }));
      }
      return;
    }

    let newStreak = streak;
    let lastResultMessage = null;
    const updatedLogs = dailyLogs.map(log => ({ ...log }));

    for (const log of unclosedPastLogs) {
      const activeHabitIds = habits.map(h => h.id);
      const completedSet = new Set(log.completedHabits);
      const allCompleted = activeHabitIds.every(id => completedSet.has(id));

      if (allCompleted) {
        newStreak += 1;
        lastResultMessage = { type: 'SUCCESS', message: null };
      } else {
        newStreak = 0;
        const missingHabits = habits.filter(h => !completedSet.has(h.id));
        const missingNames = missingHabits.map(h => h.name).join(', ');
        lastResultMessage = {
          type: 'FAILURE',
          message: `Peccato, oggi non sei riuscito a fare ${missingNames}, riprovaci domani con più determinazione!`
        };
      }

      const index = updatedLogs.findIndex(l => l.date === log.date);
      if (index !== -1) {
        updatedLogs[index] = { ...updatedLogs[index], isClosed: true };
      }
    }

    const todayLogExists = updatedLogs.some(log => log.date === today);
    if (!todayLogExists) {
      updatedLogs.push({ date: today, completedHabits: [], isClosed: false });
    }

    setState(prev => ({
      ...prev,
      dailyLogs: updatedLogs,
      streak: newStreak,
      statusMessage: lastResultMessage
    }));
  }, []);

  const addHabit = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newHabit = {
      id: crypto.randomUUID(),
      name: trimmed,
      frequency: 'daily',
      createdAt: new Date().toISOString()
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));
  }, []);

  const deleteHabit = useCallback((habitId) => {
    setState(prev => {
      const newHabits = prev.habits.filter(h => h.id !== habitId);
      const newDailyLogs = prev.dailyLogs.map(log => ({
        ...log,
        completedHabits: log.completedHabits.filter(id => id !== habitId),
      }));
      return { ...prev, habits: newHabits, dailyLogs: newDailyLogs };
    });
  }, []);

  const toggleHabit = useCallback((habitId) => {
    const today = getTodayDateString();
    setState(prev => {
      const logIndex = prev.dailyLogs.findIndex(log => log.date === today);
      if (logIndex === -1) return prev;

      const currentLog = prev.dailyLogs[logIndex];
      const isCompleted = currentLog.completedHabits.includes(habitId);
      const newCompleted = isCompleted
        ? currentLog.completedHabits.filter(id => id !== habitId)
        : [...currentLog.completedHabits, habitId];

      const updatedLog = { ...currentLog, completedHabits: newCompleted };
      const newDailyLogs = [...prev.dailyLogs];
      newDailyLogs[logIndex] = updatedLog;

      return { ...prev, dailyLogs: newDailyLogs };
    });
  }, []);

  const clearStatusMessage = useCallback(() => {
    setState(prev => ({ ...prev, statusMessage: null }));
  }, []);

  const value = useMemo(() => ({
    habits,
    dailyLogs,
    streak,
    statusMessage,
    addHabit,
    deleteHabit,
    toggleHabit,
    clearStatusMessage,
    todayDateString: getTodayDateString(),
  }), [habits, dailyLogs, streak, statusMessage, addHabit, deleteHabit, toggleHabit, clearStatusMessage]);

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
import { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits deve essere usato dentro <HabitProvider>');
  }
  return context;
}
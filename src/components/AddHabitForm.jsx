import { useState } from 'react';
import { useHabits } from '../hooks/useHabits';

export default function AddHabitForm() {
  const [name, setName] = useState('');
  const { addHabit } = useHabits();

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nuova abitudine..."
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors"
      >
        Aggiungi
      </button>
    </form>
  );
}
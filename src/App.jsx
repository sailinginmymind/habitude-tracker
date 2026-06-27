import StreakCounter from './components/StreakCounter';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import StatusModal from './components/StatusModal';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-lg mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Le mie Abitudini
          </h1>
          <div className="flex items-center gap-3">
            <StreakCounter />
            <ThemeToggle />
          </div>
        </header>

        <main className="space-y-6">
          <AddHabitForm />
          <HabitList />
        </main>

        <StatusModal />
      </div>
    </div>
  );
}
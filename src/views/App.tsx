import React, { useEffect } from 'react';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useThemeViewModel } from '../viewmodels/theme.viewmodel';

const App: React.FC = () => {
  const { currentTheme, toggleTheme } = useThemeViewModel();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <div
      className={`min-h-screen bg-primary-light dark:bg-primary-dark text-black dark:text-white`}
    >
      <header className="p-4">
        <ThemeToggleButton onClick={toggleTheme} />
      </header>
      <main className="p-4">
        <h1 className="text-2xl">Hello, World!</h1>
      </main>
    </div>
  );
};

export default App;

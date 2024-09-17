import { useEffect } from 'react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { Hero } from './partials/Hero';
import { useTheme } from './useTheme';

export function Page() {
  const { currentTheme, toggleTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <div className="bg-primary-light dark:bg-primary-dark text-black dark:text-white">
      <header className="absolute z-10 top-0 left-0 p-4 flex items-center justify-between">
        <ThemeToggleButton onClick={toggleTheme} />
        <LanguageSwitcher />
      </header>
      <main className="px-4">
        <Hero />
      </main>
    </div>
  );
}

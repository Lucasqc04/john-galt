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
    <div className="text-black dark:text-white w-screen">
      <header className="absolute z-50 top-0 left-0 p-4 flex items-center justify-between">
        <ThemeToggleButton onClick={toggleTheme} />
        <LanguageSwitcher />
      </header>
      <main>
        <Hero />
      </main>
    </div>
  );
}

// src/App.tsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useThemeViewModel } from '../viewmodels/theme.viewmodel';

const App: React.FC = () => {
  const { currentTheme, toggleTheme } = useThemeViewModel();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <div
      className={`min-h-screen bg-primary-light dark:bg-primary-dark text-black dark:text-white`}
    >
      <header className="p-4 flex items-center justify-between">
        <ThemeToggleButton onClick={toggleTheme} />
        <LanguageSwitcher />
      </header>
      <main className="p-4">
        <h1>{t('welcome')}</h1>
      </main>
    </div>
  );
};

export default App;

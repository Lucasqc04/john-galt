import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Loader } from '../components/Loader';
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useTheme } from '../screens/useTheme';

export function BrowserRouter() {
  const { currentTheme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/pt" />} />
          <Route
            path="/:lang"
            element={
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
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

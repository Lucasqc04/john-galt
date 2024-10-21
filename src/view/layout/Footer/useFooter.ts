import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeMode } from '../../../domain/entities/theme.entity';
import { useTheme } from '../../screens/useTheme';

export function useFooter() {
  const { t } = useTranslation();
  const { currentTheme, toggleTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(
    currentTheme === ThemeMode.dark,
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeMode.dark,
      currentTheme === ThemeMode.dark,
    );
    setIsDarkTheme(currentTheme === ThemeMode.dark);
  }, [currentTheme]);

  return {
    t,
    theme: {
      toggle: toggleTheme,
      isDarkTheme,
    },
  };
}

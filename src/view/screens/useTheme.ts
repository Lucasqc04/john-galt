import { useEffect, useState } from 'react';
import { ThemeMode } from '../../domain/entities/theme.entity';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || ThemeMode.light,
  );

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => {
      const newTheme =
        prevTheme === ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return {
    currentTheme,
    toggleTheme,
  };
}

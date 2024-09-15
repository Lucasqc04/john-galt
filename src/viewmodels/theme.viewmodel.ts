import { useState } from 'react';
import { ThemeMode } from '../models/theme.model';

export function useThemeViewModel() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return {
    currentTheme,
    toggleTheme,
  };
}

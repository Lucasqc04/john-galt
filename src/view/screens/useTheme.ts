import { useState } from 'react';
import { ThemeMode } from '../../domain/entities/theme.entity';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(ThemeMode.light);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === ThemeMode.light ? ThemeMode.dark : ThemeMode.light,
    );
  };

  return {
    currentTheme,
    toggleTheme,
  };
}

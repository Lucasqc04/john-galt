import { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeMode } from '../../domain/entities/theme.entity';

type ThemeContextType = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ThemeMode.light ? ThemeMode.dark : ThemeMode.light,
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

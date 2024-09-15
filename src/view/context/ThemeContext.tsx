import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ThemeMode } from '../../domain/entities/theme.entity';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

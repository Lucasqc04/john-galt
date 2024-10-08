import { useEffect, useState } from 'react';
import { useTheme } from '../../screens/useTheme';
import { useWindowSize } from '../../utils/useWindowSize';

export function useHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();
  const { width } = useWindowSize();
  const [isDarkTheme, setIsDarkTheme] = useState(currentTheme === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    setIsDarkTheme(currentTheme === 'dark');
  }, [currentTheme]);

  const isLargeScreen = width > 1024;

  return {
    menu: {
      isOpen: mobileMenuOpen,
      close: () => setMobileMenuOpen(false),
      open: () => setMobileMenuOpen(true),
    },
    theme: {
      toggle: toggleTheme,
      isDarkTheme,
    },
    isLargeScreen,
  };
}

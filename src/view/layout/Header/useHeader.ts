import { useEffect, useState } from 'react';
import { useTheme } from '../../screens/useTheme';
import { useWindowSize } from '../../utils/useWindowSize';

export function useHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();
  const { width } = useWindowSize();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
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
    },
    isLargeScreen,
  };
}

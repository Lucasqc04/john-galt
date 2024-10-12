import { useEffect, useState } from 'react';
import { MdTouchApp } from 'react-icons/md';
import { ThemeMode } from '../../../domain/entities/theme.entity';
import { ROUTES } from '../../routes/Routes';
import { useTheme } from '../../screens/useTheme';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { useWindowSize } from '../../utils/useWindowSize';

export function useHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useTheme();
  const { width } = useWindowSize();
  const [isDarkTheme, setIsDarkTheme] = useState(
    currentTheme === ThemeMode.dark,
  );
  const { currentLang } = useCurrentLang();

  useEffect(() => {
    document.documentElement.classList.toggle(
      ThemeMode.dark,
      currentTheme === ThemeMode.dark,
    );
    setIsDarkTheme(currentTheme === ThemeMode.dark);
  }, [currentTheme]);

  const isLargeScreen = width > 1024;

  const products = [
    {
      name: 'BITKIT',
      href: ROUTES.products.BITKIK.call(currentLang),
      icon: MdTouchApp,
    },
    {
      name: 'SEEDKIT',
      href: ROUTES.products.SEEDKIT.call(currentLang),
      icon: MdTouchApp,
    },
  ];

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
    products,
    isLargeScreen,
  };
}

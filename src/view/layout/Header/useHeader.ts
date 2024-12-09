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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      name: 'SEEDKIT',
      href: ROUTES.cart.product.call(currentLang, 'SEEDKIT', '1'),
      icon: MdTouchApp,
    },
    {
      name: 'BITKIT',
      href: ROUTES.cart.product.call(currentLang, 'BITKIT', '2'),
      icon: MdTouchApp,
    },
    {
      name: 'ALFRED',
      href: ROUTES.buyBitcoin.call(currentLang),
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
    isScrolled,
  };
}

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdHelp, MdSchool, MdTouchApp, MdVideoLibrary } from 'react-icons/md'; // Ícones novos
import { ThemeMode } from '../../../domain/entities/theme.entity';
import { LanguageTexts } from '../../../domain/locales/Language';
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
  const { t } = useTranslation();
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

  const supportlink = [
    {
      name: t(LanguageTexts.header.links[4]),
      href: ROUTES.Support.call(currentLang),
      icon: MdHelp,
    },
    {
      name: t(LanguageTexts.header.links[3]),
      href: ROUTES.tutorials.call(currentLang),
      icon: MdSchool,
    },
    {
      name: 'Videos',
      href: ROUTES.videos.call(currentLang),
      icon: MdVideoLibrary,
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
    supportlink,
    isLargeScreen,
    isScrolled,
  };
}

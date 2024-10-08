import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AcceptedLanguages } from '../../../domain/locales/Language';

export function useLanguageSwitcher() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: AcceptedLanguages }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('language') || lang || AcceptedLanguages.pt,
  );

  function changeLanguage(newLang: AcceptedLanguages) {
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    setSelectedLanguage(newLang);
    localStorage.setItem('language', newLang);

    const currentPath = location.pathname.split('/');
    currentPath[1] = newLang;
    navigate(currentPath.join('/'));
  }

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'pt';
    if (lang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
      setSelectedLanguage(lang);
      localStorage.setItem('language', lang);
    } else {
      i18n.changeLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n, lang]);

  return {
    language: {
      current: selectedLanguage,
      change: changeLanguage,
    },
  };
}

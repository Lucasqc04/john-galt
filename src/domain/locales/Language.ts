import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { useParams } from 'react-router-dom';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';
import translationPT from './pt/translation.json';

export const LanguageTexts = {
  header: {
    links: [
      'header.links.0',
      'header.links.1',
      'header.links.2',
      'header.links.3',
      'header.links.4',
      'header.links.5',
    ],
    contact_sales: 'header.contact_sales',
  },
};

export enum AcceptedLanguages {
  pt = 'pt',
  en = 'en',
  es = 'es',
}

const savedLanguage = localStorage.getItem('language') || AcceptedLanguages.pt;

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: translationPT },
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: savedLanguage,
  fallbackLng: AcceptedLanguages.pt,
  interpolation: {
    escapeValue: false,
  },
});

export function useLanguage() {
  const { lang } = useParams<{ lang: AcceptedLanguages }>();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem('language', lang);
    }
  }, [lang]);

  const currentLang =
    (localStorage.getItem('language') as AcceptedLanguages) ||
    AcceptedLanguages.pt;

  return {
    currentLang,
  };
}

export default i18n;

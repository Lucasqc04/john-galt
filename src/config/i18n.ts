import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationES from '../locales/es/translation.json';
import translationPT from '../locales/pt/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: translationPT },
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

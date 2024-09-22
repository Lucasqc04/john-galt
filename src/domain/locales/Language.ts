import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';
import translationPT from './pt/translation.json';

const savedLanguage = localStorage.getItem('language') || 'pt';

const Language = i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: translationPT },
    en: { translation: translationEN },
    es: { translation: translationES },
  },
  lng: savedLanguage,
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export enum LanguageTexts {
  HeroTitle = 'HeroTitle',
  HeroDescription = 'HeroDescription',
  HeroGetInTouchButton = 'HeroGetInTouchButton',
  HeroLearnMoreButton = 'HeroLearnMoreButton',
}

export default Language;

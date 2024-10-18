import i18n from 'i18next';
import { useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import { useParams } from 'react-router-dom';
import translationEN from './en/translation.json';
import translationES from './es/translation.json';
import translationPT from './pt/translation.json';

export const LanguageTexts = {
  header: {
    links: ['header.links.0', 'header.links.1', 'header.links.2'],
  },
  hero: {
    title: 'hero.title',
    description: 'hero.description',
    buttons: {
      products: 'hero.buttons.products',
      learnMore: 'hero.buttons.learnMore',
    },
  },
  positivePoints: {
    title: 'positivePoints.title',
    cards: {
      mentality: 'positivePoints.cards.0',
      protocols: 'positivePoints.cards.1',
      transparency: 'positivePoints.cards.2',
      security: 'positivePoints.cards.3',
    },
  },
  statistics: {
    title: 'statistics.title',
    infos: 'statistics.infos',
  },
  products: {
    title: 'products.title',
    infos: 'products.infos',
    buyNowButton: 'products.buyNowButton',
    resourcesTitle: 'products.resourcesTitle',
    resources: 'products.resources',
  },
  blogs: {
    title: 'blogs.title',
  },
  newsletter: {
    title: 'newsletter.title',
    description: 'newsletter.description',
    form: {
      email: 'newsletter.form.email',
      submitButton: 'newsletter.form.submitButton',
    },
  },
  footer: {
    links: 'footer.links',
    allRightsReserved: 'footer.allRightsReserved',
  },
  about: {
    title: 'about.title',
    subtitle: 'about.subtitle',
    manifest: 'about.manifest',
  },
  post: {
    notFound: 'post.notFound',
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

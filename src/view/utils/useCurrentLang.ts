import { useTranslation } from 'react-i18next';
import { AcceptedLanguages } from '../../domain/locales/Language';

export function useCurrentLang() {
  const { i18n } = useTranslation();

  let currentLang = i18n.language.split('-')[0] as AcceptedLanguages;
  const supportedLanguages = [
    AcceptedLanguages.pt,
    AcceptedLanguages.en,
    AcceptedLanguages.es,
  ];

  if (!supportedLanguages.includes(currentLang)) {
    currentLang = AcceptedLanguages.en;
  }

  return {
    currentLang,
  };
}

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import brasil from '../assets/images/brasil.png';
import espanha from '../assets/images/espanha.png';
import estadosUnidos from '../assets/images/estados-unidos.png';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  function changeLanguage(lang: string) {
    navigate(`/${lang}`);
  }

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang || 'pt';
  }, [i18n, lang]);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('pt')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={brasil} alt="Português - Brasil" className="w-6 h-6" />
      </button>

      <button
        onClick={() => changeLanguage('en')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={estadosUnidos} alt="English - USA" className="w-6 h-6" />
      </button>

      <button
        onClick={() => changeLanguage('es')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={espanha} alt="Español - España" className="w-6 h-6" />
      </button>
    </div>
  );
}

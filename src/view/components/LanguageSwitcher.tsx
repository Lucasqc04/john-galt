import { useTranslation } from 'react-i18next';
import brasil from '../assets/images/brasil.png';
import espanha from '../assets/images/espanha.png';
import estadosUnidos from '../assets/images/estados-unidos.png';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => i18n.changeLanguage('pt')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={brasil} alt="Português - Brasil" className="w-6 h-6" />
      </button>

      <button
        onClick={() => i18n.changeLanguage('en')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={estadosUnidos} alt="English - USA" className="w-6 h-6" />
      </button>

      <button
        onClick={() => i18n.changeLanguage('es')}
        className="bg-light-secondary text-black dark:text-white p-2 rounded-full dark:bg-button-curved-default-dark"
      >
        <img src={espanha} alt="Español - España" className="w-6 h-6" />
      </button>
    </div>
  );
}

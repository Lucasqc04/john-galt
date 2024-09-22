import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import brasil from '../assets/images/brasil.png';
import espanha from '../assets/images/espanha.png';
import estadosUnidos from '../assets/images/estados-unidos.png';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('language') || lang || 'pt',
  );

  function changeLanguage(newLang: string) {
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    setSelectedLanguage(newLang);
    localStorage.setItem('language', newLang);
    navigate(`/${newLang}`);
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

  return (
    <div className="flex gap-2">
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6">
          {selectedLanguage === 'pt' && (
            <>
              <img src={brasil} alt="Português" className="h-5 w-5" />
              Português
            </>
          )}
          {selectedLanguage === 'en' && (
            <>
              <img src={estadosUnidos} alt="English" className="h-5 w-5" />
              English
            </>
          )}
          {selectedLanguage === 'es' && (
            <>
              <img src={espanha} alt="Español" className="h-5 w-5" />
              Español
            </>
          )}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </PopoverButton>

        <PopoverPanel className="absolute z-10 mt-2 w-36 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
          <div className="py-2">
            <button
              onClick={() => changeLanguage('pt')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img src={brasil} alt="Português" className="mr-2 h-5 w-5" />
              Português
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img src={estadosUnidos} alt="English" className="mr-2 h-5 w-5" />
              English
            </button>
            <button
              onClick={() => changeLanguage('es')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <img src={espanha} alt="Español" className="mr-2 h-5 w-5" />
              Español
            </button>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}

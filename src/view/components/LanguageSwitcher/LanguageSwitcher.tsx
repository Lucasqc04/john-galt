import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { AcceptedLanguages } from '../../../domain/locales/Language';
import brasil from '../../assets/images/brasil.png';
import espanha from '../../assets/images/espanha.png';
import estadosUnidos from '../../assets/images/estados-unidos.png';
import {
  LanguageSwitcherProps,
  useLanguageSwitcher,
} from './useLanguageSwitcher';

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language } = useLanguageSwitcher();

  return (
    <div className="flex gap-2">
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white focus:ring-0 focus:outline-none">
          {language.current === AcceptedLanguages.pt && (
            <>
              <img src={brasil} alt="Português" className="h-5 w-5" />
              <span className={className}>BR</span>
            </>
          )}
          {language.current === AcceptedLanguages.en && (
            <>
              <img src={estadosUnidos} alt="English" className="h-5 w-5" />
              <span className={className}>EN</span>
            </>
          )}
          {language.current === AcceptedLanguages.es && (
            <>
              <img src={espanha} alt="Español" className="h-5 w-5" />
              <span className={className}>ES</span>
            </>
          )}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400 dark:text-gray-200"
            aria-hidden="true"
          />
        </PopoverButton>

        <PopoverPanel className="absolute z-10 mt-2 w-36 rounded-lg bg-white dark:bg-gray-700 shadow-lg ring-1 ring-gray-900/5">
          <div className="py-2">
            <button
              onClick={() => language.change(AcceptedLanguages.pt)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <img src={brasil} alt="Português" className="mr-2 h-5 w-5" />
              Português
            </button>
            <button
              onClick={() => language.change(AcceptedLanguages.en)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <img src={estadosUnidos} alt="English" className="mr-2 h-5 w-5" />
              English
            </button>
            <button
              onClick={() => language.change(AcceptedLanguages.es)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
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

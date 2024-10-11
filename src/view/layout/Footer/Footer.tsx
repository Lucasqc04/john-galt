import { useTranslation } from 'react-i18next';
import { LanguageTexts } from '../../../domain/locales/Language';
import LogoWhite from '../../assets/logo-white.svg';
import Logo from '../../assets/logo.svg';
import { useFooter } from './useFooter';

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useFooter();

  return (
    <footer className="bg-slate-100 dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex lg:flex-1 justify-center lg:justify-start mb-4 sm:mb-0">
            <a href="/">
              <img
                src={theme.isDarkTheme ? LogoWhite : Logo}
                alt="Logo"
                className="w-24 h-22"
              />
              <span className="sr-only">DIY LAB</span>
            </a>
          </div>
          <ul className="flex flex-col sm:flex-row flex-wrap items-center text-center sm:text-left mb-6 text-sm font-medium dark:text-white sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline mb-2 sm:mb-0 sm:me-6">
                {t(LanguageTexts.FooterAbout)}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline mb-2 sm:mb-0 sm:me-6">
                {t(LanguageTexts.FooterPrivacyPolicy)}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline mb-2 sm:mb-0 sm:me-6">
                {t(LanguageTexts.FooterLicensing)}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                {t(LanguageTexts.FooterContact)}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-center text-sm dark:text-gray-400">
          © 2024{' '}
          <a href="#" className="hover:underline">
            DIY LAB™
          </a>
          . {t(LanguageTexts.FooterAllRightsReserved)}
        </span>
      </div>
    </footer>
  );
}

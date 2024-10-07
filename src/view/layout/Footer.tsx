import { useTranslation } from 'react-i18next';
import { LanguageTexts } from '../../domain/locales/Language';
import LogoWhite from '../assets/logo-white.svg';
import Logo from '../assets/logo.svg';
import { useHeader } from './Header/useHeader';

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useHeader();

  return (
    <footer className="bg-slate-100 dark:bg-gray-800 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex lg:flex-1 justify-center lg:justify-start">
            <a href="/">
              <img
                src={theme.isDarkTheme ? LogoWhite : Logo}
                alt=""
                className="w-24 h-22"
              />
              <span className="sr-only">DIY LAB</span>
            </a>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium dark:text-white-white sm:mb-0 dark:text-white-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t(LanguageTexts.FooterAbout)}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                {t(LanguageTexts.FooterPrivacyPolicy)}
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:text-white-white lg:my-8" />
        <span className="block text-smdark:text-white-white sm:text-center dark:text-white-gray-400">
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

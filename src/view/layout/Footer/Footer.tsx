import { AiOutlineWhatsApp } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { LanguageTexts } from '../../../domain/locales/Language';
import LogoWhite from '../../assets/logo-white.svg';
import Logo from '../../assets/logo.svg';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { useFooter } from './useFooter';

export function Footer() {
  const { t, theme } = useFooter();
  const { currentLang } = useCurrentLang();

  const redirects = [
    ROUTES.about.call(currentLang),
    ROUTES.policyPrivacy.call(currentLang),
    'mailto:diylabweb3@gmail.com',
  ];

  const links = t(LanguageTexts.footer.links, {
    returnObjects: true,
  }) as string[];

  return (
    <footer className="bg-slate-100 dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex lg:flex-1 justify-center lg:justify-start mb-4 sm:mb-0">
            <Link to={ROUTES.home.call()}>
              <img
                src={theme.isDarkTheme ? LogoWhite : Logo}
                alt="Logo"
                className="w-24 h-22"
              />
              <span className="sr-only">DIY LAB</span>
            </Link>
          </div>
          <ul className="flex flex-col sm:flex-row flex-wrap items-center text-center sm:text-left mb-6 text-sm font-medium sm:mb-0 dark:text-gray-400">
            {links.map((link, idx) => (
              <li key={idx}>
                {idx === link.length && (
                  <a
                    href={redirects[idx]}
                    className="hover:underline mb-2 sm:mb-0 sm:me-6"
                  >
                    {t(link)}
                  </a>
                )}
                {idx !== link.length && (
                  <Link
                    to={redirects[idx]}
                    className="hover:underline mb-2 sm:mb-0 sm:me-6"
                  >
                    {t(link)}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center sm:justify-between space-x-4">
            <div className="group relative inline-block">
              <a
                href="https://www.instagram.com/diyseclab.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                <FaInstagram
                  className="transform transition-transform duration-300 hover:scale-125 text-gray-700 dark:text-white hover:text-[#F6911D]"
                  size={40}
                />
              </a>
              <span className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                Instagram
              </span>
            </div>

            <div className="group relative inline-block">
              <a
                href="https://api.whatsapp.com/send?phone=+5511994458337&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20DIY%20LAB..."
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                <AiOutlineWhatsApp
                  className="transform transition-transform duration-300 hover:scale-125 text-gray-700 dark:text-white hover:text-[#F6911D]"
                  size={40}
                />
              </a>
              <span className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                WhatsApp
              </span>
            </div>

            <div className="group relative inline-block">
              <a
                href="https://x.com/diyseclab"
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
              >
                <FaXTwitter
                  className="transform transition-transform duration-300 hover:scale-125 text-gray-700 dark:text-white hover:text-[#F6911D]"
                  size={40}
                />
              </a>
              <span className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-0 group-hover:scale-100">
                X
              </span>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-center text-sm dark:text-gray-400">
          © 2024{' '}
          <a href="#" className="hover:underline">
            DIY LAB™
          </a>
          . {t(LanguageTexts.footer.allRightsReserved)}
        </span>
      </div>
    </footer>
  );
}

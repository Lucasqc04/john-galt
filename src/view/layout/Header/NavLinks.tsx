import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { CursorArrowRaysIcon, PhoneIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { blogData } from '../../../blogContent/blogPosts'; // Certifique-se de que isso está correto
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';

export function NavLinks({
  closeButton,
  isVisible,
  isLargeScreen,
  LinkCallBack,
}: {
  closeButton?: ReactNode;
  isVisible: boolean;
  isLargeScreen: boolean;
  LinkCallBack?: () => void;
}) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  let currentLang = i18n.language.split('-')[0] as 'pt' | 'en' | 'es';
  const supportedLanguages = ['pt', 'en', 'es'];

  if (!supportedLanguages.includes(currentLang)) {
    currentLang = 'en';
  }

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  const products = [
    {
      name: 'BITKIT',
      href: `/${currentLang}/bitkit`,
      icon: CursorArrowRaysIcon,
    },
    {
      name: 'SEEDKIT',
      href: `/${currentLang}/seedkit`,
      icon: CursorArrowRaysIcon,
    },
    {
      name: 'BITMASTER',
      href: `/${currentLang}/bitmaster`,
      icon: CursorArrowRaysIcon,
    },
  ];

  const callsToAction = [{ name: 'Contact sales', href: '#', icon: PhoneIcon }];

  return (
    <>
      {isVisible && (
        <>
          {closeButton && (
            <div className="w-screen flex justify-end pt-4 pr-6">
              {closeButton}
            </div>
          )}
          <PopoverGroup className="flex flex-col items-center justify-center gap-y-10 lg:gap-x-12 lg:flex-row lg:gap-y-0">
            <Popover className="relative">
              <PopoverButton className="text-2xl flex items-center justify-center gap-x-1 lg:text-sm font-semibold leading-6 hover:text-[#F6911D]">
                Produtos
                <MdKeyboardArrowDown
                  aria-hidden="true"
                  size={isLargeScreen ? 24 : 28}
                  className="flex-none text-gray-500 dark:text-white"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-32 lg:-left-8 top-full z-10 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:text-white shadow-lg ring-1 ring-gray-900/5 transition"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:text-[#F6911D] hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg hover:text-[#F6911D] group-hover:bg-white dark:group-hover:bg-gray-700">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 dark:text-white hover:text-[#F6911D]"
                        />
                      </div>
                      <div className="flex-auto">
                        <button
                          onClick={() => handleOnLink(item.href)}
                          className="block font-semibold hover:text-[#F6911D]"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-700">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 hover:text-[#F6911D]"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400 dark:text-gray-300"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <button
              onClick={() =>
                handleOnLink(`/${currentLang}/sobre-nos`, LinkCallBack)
              }
              className="text-2xl lg:text-sm font-semibold leading-6 hover:text-[#F6911D]"
            >
              Quem Somos
            </button>
            <Popover className="relative">
              <PopoverButton className="text-2xl flex items-center justify-center gap-x-1 lg:text-sm font-semibold leading-6 hover:text-[#F6911D]">
                Blogs
                <MdKeyboardArrowDown
                  aria-hidden="true"
                  size={isLargeScreen ? 24 : 28}
                  className="flex-none hover:text-[#F6911D]"
                />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-32 lg:-left-8 top-full z-10 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 dark:text-white shadow-lg ring-1 ring-gray-900/5 transition"
              >
                <div className="p-4 grid grid-cols-1 gap-y-4">
                  {Object.keys(blogData).map((postId) => {
                    const post = blogData[postId];
                    const translation = post.translations[currentLang];

                    if (!translation) {
                      console.error(
                        `No translation found for language: ${currentLang}`,
                      );
                      return null;
                    }
                    return (
                      <div
                        key={postId}
                        className="flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <img
                          src={post.image}
                          alt={translation.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <Link
                          key={postId}
                          to={`/${currentLang}/blog/${postId}`}
                          className="bg-white dark:bg-slate-800   overflow-hidden transition-transform transform hover:scale-105"
                        >
                          {translation.title}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </PopoverPanel>
            </Popover>

            <LanguageSwitcher className="text-xl flex items-center justify-center gap-x-2 lg:text-sm font-semibold leading-6 hover:text-[#F6911D]" />
          </PopoverGroup>
        </>
      )}
    </>
  );
}

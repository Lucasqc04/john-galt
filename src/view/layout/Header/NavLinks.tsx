import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { PhoneIcon } from '@heroicons/react/20/solid';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { blogData } from '../../../blogContent/blogPosts';
import { LanguageTexts } from '../../../domain/locales/Language';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { useCartContext } from '../../context/CartContext';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

type Products = {
  name: string;
  href: string;
  icon: IconType;
};

type NavLinksProps = {
  products: Products[];
  supportlink: Products[];
  isVisible: boolean;
  closeButton?: ReactNode;
  isLargeScreen: boolean;
  LinkCallBack?: () => void;
};

export function NavLinks({
  products,
  supportlink,
  closeButton,
  isVisible,
  isLargeScreen,
  LinkCallBack,
}: NavLinksProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const { items } = useCartContext();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  const callsToAction = [
    {
      name: t(LanguageTexts.header.contact_sales),
      href: 'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20DIY%20LAB...',
      icon: PhoneIcon,
    },
  ];

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
              <PopoverButton className=" hover:text-[#F6911D] text-2xl flex items-center justify-center gap-x-1 lg:text-xl font-semibold leading-6 text-black dark:text-white ">
                {t(LanguageTexts.header.links[0])}
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
                    <button
                      key={item.name}
                      onClick={() => handleOnLink(item.href, LinkCallBack)}
                      className="w-full group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:text-[#F6911D] hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-white dark:group-hover:bg-gray-700">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 dark:text-white hover:text-[#F6911D]"
                        />
                      </div>
                      <span className="font-semibold hover:text-[#F6911D]">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-700">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener"
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
                handleOnLink(ROUTES.about.call(currentLang), LinkCallBack)
              }
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D]"
            >
              {t(LanguageTexts.header.links[1])}
            </button>

            <Popover className="relative">
              <PopoverButton className="text-2xl flex items-center justify-center gap-x-1 lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D]">
                {t(LanguageTexts.header.links[2])}
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
                  {Object.keys(blogData)
                    .slice(0, 1)
                    .map((postId) => {
                      const post = blogData[postId];
                      const translation = post.translations[currentLang];

                      if (!translation) {
                        console.error(
                          `No translation found for language: ${currentLang}`,
                        );
                        return null;
                      }
                      return (
                        <button
                          key={postId}
                          onClick={() =>
                            handleOnLink(
                              ROUTES.blog.callLang(currentLang, postId),
                              LinkCallBack,
                            )
                          }
                          className="flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <img
                            src={
                              typeof post.translations.pt.sections[0].image ===
                              'string'
                                ? post.translations.pt.sections[0].image
                                : post.translations.pt.sections[0].image?.src
                            }
                            alt={translation.title}
                            className="h-12 w-12 rounded-lg object-cover cursor-pointer"
                          />
                          <div className="bg-white dark:bg-slate-800 overflow-hidden transition-transform transform hover:scale-105">
                            {translation.title}
                            <span className="absolute inset-0" />
                          </div>
                        </button>
                      );
                    })}
                </div>
              </PopoverPanel>
            </Popover>

            <Popover className="relative">
              <PopoverButton className=" hover:text-[#F6911D] text-2xl flex items-center justify-center gap-x-1 lg:text-xl font-semibold leading-6 text-black dark:text-white ">
                {t(LanguageTexts.header.links[4])}
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
                  {supportlink.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleOnLink(item.href, LinkCallBack)}
                      className="w-full group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:text-[#F6911D] hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg group-hover:bg-white dark:group-hover:bg-gray-700">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 dark:text-white hover:text-[#F6911D]"
                        />
                      </div>
                      <span className="font-semibold hover:text-[#F6911D]">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <LanguageSwitcher className="text-xl flex items-center justify-center gap-x-2 lg:text-xl font-semibold leading-6 hover:text-[#F6911D]" />

            <button
              onClick={() =>
                handleOnLink(ROUTES.buyBitcoin.call(currentLang), LinkCallBack)
              }
              className="flex items-center text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D]"
            >
              <span className="hover:text-[#F6911D]">
                {t(LanguageTexts.header.links[5])}
              </span>
            </button>

            <button
              onClick={() =>
                handleOnLink(ROUTES.cart.call(currentLang), LinkCallBack)
              }
              className="relative ml-4 flex items-center"
            >
              <AiOutlineShoppingCart className="h-6 w-6 text-gray-700 dark:text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </PopoverGroup>
        </>
      )}
    </>
  );
}

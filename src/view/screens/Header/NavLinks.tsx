import { PopoverGroup } from '@headlessui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageTexts } from '../../../domain/locales/Language';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
type NavLinksProps = {
  isVisible: boolean;
  closeButton?: ReactNode;
  isLargeScreen: boolean;
  LinkCallBack?: () => void;
};

export function NavLinks({
  closeButton,
  isVisible,
  LinkCallBack,
}: NavLinksProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };
  //   const callsToAction = [
  //     {
  //       name: t(LanguageTexts.header.contact_sales),
  //       href: 'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20DIY%20LAB...',
  //       icon: PhoneIcon,
  //     },
  //   ];
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
            <button
              onClick={() => handleOnLink(ROUTES.home.call(), LinkCallBack)}
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F39200] dark:hover:text-[#F39200]"
            >
              {t(LanguageTexts.header.links[0])}
            </button>
            <button
              onClick={() =>
                handleOnLink(
                  ROUTES.aboutBitcoin.call(currentLang),
                  LinkCallBack,
                )
              }
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F39200] dark:hover:text-[#F39200]"
            >
              {t(LanguageTexts.header.links[1])}
            </button>

            <button
              onClick={() =>
                handleOnLink(ROUTES.fee.call(currentLang), LinkCallBack)
              }
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F39200] dark:hover:text-[#F39200]"
            >
              {t(LanguageTexts.header.links[2])}
            </button>

            <button
              onClick={() =>
                handleOnLink(ROUTES.term.call(currentLang), LinkCallBack)
              }
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F39200] dark:hover:text-[#F39200]"
            >
              {t(LanguageTexts.header.links[3])}
            </button>

            <button
              onClick={() =>
                handleOnLink(ROUTES.Support.call(currentLang), LinkCallBack)
              }
              className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F39200] dark:hover:text-[#F39200]"
            >
              {t(LanguageTexts.header.links[4])}
            </button>

            <LanguageSwitcher className="text-xl flex items-center justify-center gap-x-2 lg:text-xl font-semibold leading-6 hover:text-[#F39200] dark:hover:text-[#F39200]" />
          </PopoverGroup>
        </>
      )}
    </>
  );
}

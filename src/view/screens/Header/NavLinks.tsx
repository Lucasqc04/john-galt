import { PopoverGroup } from '@headlessui/react';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageTexts } from '../../../domain/locales/Language';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

type NavLinksProps = {
  isVisible: boolean;
  closeButton?: ReactNode;
  isLargeScreen: boolean;
  LinkCallBack?: () => void;
};

export function NavLinks({ LinkCallBack }: NavLinksProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();

  const Links = [
    {
      path: ROUTES.home.call(),
      label: t(LanguageTexts.header.links[0]),
    },
    {
      path: ROUTES.aboutBitcoin.call(currentLang),
      label: t(LanguageTexts.header.links[1]),
    },
    {
      path: ROUTES.fee.call(currentLang),
      label: t(LanguageTexts.header.links[2]),
    },
    {
      path: ROUTES.term.call(currentLang),
      label: t(LanguageTexts.header.links[3]),
    },
    {
      path: ROUTES.Support.call(currentLang),
      label: t(LanguageTexts.header.links[4]),
    },
  ];

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <>
      <PopoverGroup className="flex flex-row items-center justify-center gap-x-1 sm:gap-x-2 flex-wrap">
        {Links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleOnLink(link.path, LinkCallBack)}
            className={classNames(
              'text-xl sm:text-2xl lg:text-3xl font-semibold leading-6 text-white px-3 sm:px-5 py-2 transition-all text-center',
              'hover:bg-white hover:text-black duration-300 ease-in-out',
              'w-auto',
              'font-pixelade',
            )}
          >
            {link.label}
          </button>
        ))}
      </PopoverGroup>
    </>
  );
}

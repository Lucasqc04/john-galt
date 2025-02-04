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

export function NavLinks({
  closeButton,
  isVisible,
  LinkCallBack,
}: NavLinksProps) {
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
      {isVisible && (
        <>
          {closeButton && (
            <div className="w-screen flex justify-end pt-4 pr-6">
              {closeButton}
            </div>
          )}
          <PopoverGroup className="flex flex-col items-center justify-center gap-y-10 lg:gap-x-12 lg:flex-row lg:gap-y-0">
            {Links.map((link) => (
              <button
                onClick={() => handleOnLink(link.path, LinkCallBack)}
                className={classNames(
                  'text-2xl lg:text-xl font-semibold leading-6 text-white px-2 transition-all',
                  'hover:bg-white hover:text-black duration-300 ease-in-out',
                )}
              >
                {link.label}
              </button>
            ))}
          </PopoverGroup>
        </>
      )}
    </>
  );
}

import AlfredBlackLogo from '@/view/assets/logo/alfred-white-logo.svg';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { NavLinks } from './NavLinks';
import { useHeader } from './useHeader';

export default function Header() {
  const { isLargeScreen, menu } = useHeader();

  return (
    <header
      className={classNames(
        'flex items-center justify-between w-full max-w-[100vw] transition-all duration-300 bg-transparent px-8 sm:px-28 py-6 sm:py-8',
      )}
    >
      <nav
        aria-label="Global"
        className="w-full flex items-center justify-between"
      >
        <div className="flex justify-center lg:justify-start ">
          <Link to={ROUTES.home.call()}>
            <img src={AlfredBlackLogo} alt="Alfred Logo" className="w-28" />
          </Link>
        </div>
        <div className="flex lg:hidden items-center">
          <LanguageSwitcher LabelClassName="text-xl flex items-center justify-center gap-x-2 lg:text-xl font-semibold leading-6" />
          <button
            type="button"
            onClick={menu.open}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <FaBars aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <NavLinks isVisible={isLargeScreen} isLargeScreen={isLargeScreen} />

        <LanguageSwitcher
          className="hidden lg:flex"
          LabelClassName="text-xl items-center justify-center gap-x-2 lg:text-xl font-semibold leading-6"
        />
        {menu.isOpen &&
          createPortal(
            <div className="fixed top-0 left-0 h-screen w-screen bg-white z-50 px-6">
              <div className="w-full flex justify-between items-center">
                <img
                  src={AlfredBlackLogo}
                  alt="Alfred Logo"
                  className="w-24 h-22"
                />
                <span className="sr-only">DIY LAB</span>
                <button
                  onClick={menu.close}
                  className="text-gray-700 dark:text-white p-4"
                >
                  <MdClose size={28} />
                </button>
              </div>
              <div className="w-full h-3/4 flex flex-col justify-center items-center">
                <NavLinks
                  isVisible
                  isLargeScreen={isLargeScreen}
                  closeButton={null}
                  LinkCallBack={() => menu.close()}
                />
              </div>
            </div>,
            document.body,
          )}
      </nav>
    </header>
  );
}

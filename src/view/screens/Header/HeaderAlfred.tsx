import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/logo-complete-black.png';
import LogoWhite from '../../assets/logo/logo-complete-white.png';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { NavLinks } from './NavLinks';
import { useHeader } from './useHeader';

export default function Header() {
  const { isLargeScreen, menu, theme, isScrolled } = useHeader();

  return (
    <header
      className={classNames(
        'fixed z-50 top-0 left-0 pt-0 md:p-2 flex items-center justify-between w-full max-w-[100vw] transition-all duration-300',
        isScrolled && 'shadow-sm bg-[#B9B8B8] dark:bg-black',
      )}
    >
      <nav
        aria-label="Global"
        className="w-full flex items-center justify-between"
      >
        <div className="flex lg:flex-1 justify-center lg:justify-start ml-7">
          <Link to={ROUTES.home.call()}>
            <h1 className="font-extrabold  dark:text-white font-lexend ">
              ALFRED
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden items-center">
          <LanguageSwitcher className=" text-xl flex items-center justify-center gap-x-2 lg:text-xl font-semibold leading-6 hover:text-[#F6911D]" />
          <label className="inline-flex items-center relative cursor-pointer mr-7">
            <input
              className="peer hidden"
              id="toggle-mobile"
              type="checkbox"
              checked={theme.isDarkTheme}
              onClick={theme.toggle}
              onChange={() => {}}
            />
            <div
              className="relative w-[80px] h-[35px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-['']
            after:w-[30px] after:h-[30px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900
            after:rounded-full after:top-[2.5px] after:left-[2.5px] active:after:w-[40px] peer-checked:after:left-[75px] peer-checked:after:translate-x-[-100%]
            shadow-sm duration-300 after:duration-300 after:shadow-md"
            ></div>
            <FaSun className="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[10px]" />
            <FaMoon className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[10px]" />
          </label>

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

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <div className="flex items-center">
            <label className="inline-flex items-center relative cursor-pointer ml-4">
              <input
                className="peer hidden"
                id="toggle"
                type="checkbox"
                checked={theme.isDarkTheme}
                onClick={theme.toggle}
                onChange={() => {}}
              />
              <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
              <FaSun className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]" />
              <FaMoon className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]" />
            </label>
          </div>
        </div>

        {menu.isOpen &&
          createPortal(
            <div className="fixed top-0 left-0 h-screen w-screen  bg-[#B9B8B8] dark:bg-[#606060] z-50 px-6">
              <div className="w-full flex justify-between items-center">
                <img
                  src={theme.isDarkTheme ? LogoWhite : Logo}
                  alt="DIY LAB Logo"
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

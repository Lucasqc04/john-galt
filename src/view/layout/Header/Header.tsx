import { Bars3Icon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { NavLinks } from './NavLinks';
import { useHeader } from './useHeader';

export default function Header() {
  const { isLargeScreen, menu, theme } = useHeader();

  return (
    <header className="absolute z-50 top-0 left-0 p-4 flex items-center justify-between w-full max-w-[100vw]">
      <nav
        aria-label="Global"
        className="w-full flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 justify-center lg:justify-start">
          <h1 className="font-extrabold self-center text-2xl whitespace-nowrap dark:text-white">
            DIY LAB
          </h1>
        </div>

        {/* Botão do menu mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={menu.open}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Links de navegação para telas grandes */}
        <NavLinks isVisible={isLargeScreen} isLargeScreen={isLargeScreen} />

        {/* Switch de tema para telas grandes */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <label className="inline-flex items-center relative cursor-pointer">
            <input
              className="peer hidden"
              id="toggle"
              type="checkbox"
              onClick={theme.toggle}
            />
            <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
            <FaSun
              className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
              style={{ position: 'absolute', left: '13px' }}
            />
            <FaMoon
              className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
              style={{ position: 'absolute', right: '13px' }}
            />
          </label>
        </div>

        {/* Menu mobile */}
        {menu.isOpen &&
          createPortal(
            <div className="fixed top-0 left-0 h-screen w-screen bg-white dark:bg-gray-900 z-50 flex flex-col justify-center items-center p-6">
              <div className="w-full flex justify-between items-center">
                <h1 className="font-extrabold text-2xl text-center text-gray-900 dark:text-white">
                  DIY LAB
                </h1>
                <button
                  onClick={menu.close}
                  className="text-gray-700 dark:text-white p-4"
                >
                  <MdClose size={28} />
                </button>
              </div>

              <NavLinks
                isVisible
                isLargeScreen={isLargeScreen}
                closeButton={null}
              />

              {/* Switch de tema no mobile */}
              <div className="mt-10">
                <label className="inline-flex items-center relative cursor-pointer">
                  <input
                    className="peer hidden"
                    id="toggle"
                    type="checkbox"
                    onClick={theme.toggle}
                  />
                  <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
                  <FaSun
                    className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
                    style={{ position: 'absolute', left: '13px' }}
                  />
                  <FaMoon
                    className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
                    style={{ position: 'absolute', right: '13px' }}
                  />
                </label>
              </div>
            </div>,
            document.body,
          )}
      </nav>
    </header>
  );
}

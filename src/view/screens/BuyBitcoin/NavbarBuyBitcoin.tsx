import { useState } from 'react';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../layout/Header/useHeader';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function NavBarBuyBitcoin() {
  const { theme } = useHeader();
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <div className="relative flex justify-between items-center pt-8 px-4 sm:px-6 md:px-8">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-3xl text-black dark:text-white"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 w-full ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:justify-center`}
      >
        <div>
          <button
            onClick={() => handleOnLink(ROUTES.buyBitcoin.call(currentLang))}
            className="text-xl sm:text-2xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]"
          >
            Inicio
          </button>
        </div>
        <div>
          <button
            onClick={() => handleOnLink(ROUTES.aboutBitcoin.call(currentLang))}
            className="text-xl sm:text-2xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]"
          >
            Sobre
          </button>
        </div>
        <div>
          <button
            onClick={() => handleOnLink(ROUTES.fee.call(currentLang))}
            className="text-xl sm:text-2xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]"
          >
            Taxas
          </button>
        </div>
        <div>
          <button
            onClick={() => handleOnLink(ROUTES.term.call(currentLang))}
            className="text-xl sm:text-2xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]"
          >
            Termos
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              window.open(
                'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0AEu%20preciso%20de%20ajuda%20com%20a%20compra%20de%20Bitcoin...',
                '_blank',
              )
            }
            className="text-xl sm:text-2xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]"
          >
            Suporte
          </button>
        </div>
        <label className="inline-flex items-center relative cursor-pointer mr-4 mt-4 sm:mt-0">
          <input
            className="peer hidden"
            id="toggle-mobile"
            type="checkbox"
            checked={theme.isDarkTheme}
            onClick={theme.toggle}
            onChange={() => {}}
          />
          <div className="relative w-[80px] h-[35px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[30px] after:h-[30px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[2.5px] after:left-[2.5px] active:after:w-[40px] peer-checked:after:left-[75px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
          <FaSun className="fill-white peer-checked:opacity-60 absolute w-4 h-4 left-[10px]" />
          <FaMoon className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-4 h-4 right-[10px]" />
        </label>
      </div>
    </div>
  );
}

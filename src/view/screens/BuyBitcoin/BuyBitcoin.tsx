import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import Usd from '../../assets/usd.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function BuyBitcoin() {
  const { currentLang } = useCurrentLang();
  const navigate = useNavigate();
  const [action, setAction] = useState<'Comprar' | 'Vender'>('Comprar');
  const [currency, setCurrency] = useState<'BRL' | 'USD' | 'BTC'>('BRL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleAction = () => {
    setAction((prevAction) =>
      prevAction === 'Comprar' ? 'Vender' : 'Comprar',
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const selectCurrency = (currencyCode: 'BRL' | 'USD' | 'BTC') => {
    setCurrency(currencyCode);
    setIsDropdownOpen(false);
  };
  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <div>
      <BackgroundAnimatedProduct />
      <NavBarBuyBitcoin />
      <div className="pt-5 pb-9 flex justify-center">
        <h1 className="text-black dark:text-white font-black text-7xl text-center">
          <span>DIY</span>
          <br />
          <span>SEC</span>
          <br />
          <span>LAB</span>
        </h1>
      </div>

      <div className="flex justify-center">
        <div>
          <div className="flex justify-center items-center space-x-4">
            <div className="relative">
              <button
                onClick={toggleAction}
                className={`font-bold absolute left-2 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-3xl text-black dark:text-white ${
                  action === 'Comprar' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {action}
              </button>
              <input
                id="1"
                type="text"
                placeholder="0000"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full">
                <img src={Btc} alt="Bitcoin" className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center pt-4">
            <div className="relative">
              <input
                id="2"
                type="text"
                placeholder="0000"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700"
              />
              <button
                onClick={toggleDropdown}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full"
              >
                {currency === 'BRL' ? (
                  <img src={Brl} alt="BRL" className="w-8 h-8" />
                ) : currency === 'USD' ? (
                  <img src={Usd} alt="USD" className="w-8 h-8" />
                ) : (
                  <img src={Btc} alt="BTC" className="w-8 h-8" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-2 top-full mt-2 w-24 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    <li
                      onClick={() => selectCurrency('BRL')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      BRL
                      <img src={Brl} alt="BRL" className="w-8 h-8 ml-1" />
                    </li>
                    <li
                      onClick={() => selectCurrency('USD')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      USD
                      <img src={Usd} alt="USD" className="w-8 h-8 ml-1" />
                    </li>
                    <li
                      onClick={() => selectCurrency('BTC')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      BTC
                      <img src={Btc} alt="BTC" className="w-8 h-8 ml-1" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center pt-4">
            <button
              onClick={() => handleOnLink(ROUTES.buyCheckout.call(currentLang))}
              type="button"
              className="w-[100%] h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold"
            >
              Prosseguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

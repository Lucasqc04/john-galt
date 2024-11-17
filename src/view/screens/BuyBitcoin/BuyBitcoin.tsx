import axios from 'axios';
import React, { SetStateAction, useEffect, useState } from 'react';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import Usd from '../../assets/usd.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

interface Rates {
  BRL: number;
  USD: number;
  BTC: number;
}

export default function BuyBitcoin() {
  const [action, setAction] = useState('Comprar');
  const [currency, setCurrency] = useState('BRL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [convertedValue, setConvertedValue] = useState<number | string>('');
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl',
        );
        const { brl, usd } = response.data.bitcoin;
        setRates({ BRL: brl, USD: usd, BTC: 1 });
      } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates && inputValue) {
      const rate = rates[currency as keyof Rates];
      setConvertedValue((Number(inputValue) * rate).toFixed(2));
    }
  }, [currency, inputValue, rates]);

  const toggleAction = () => {
    setAction(action === 'Comprar' ? 'Vender' : 'Comprar');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCurrency = (currencyCode: SetStateAction<string>) => {
    setCurrency(currencyCode);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="0000"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full">
                <img src={Btc} alt="BRL" className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center pt-4">
            <div className="relative">
              <input
                type="text"
                value={convertedValue}
                readOnly
                placeholder="0000"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700"
              />
              <button
                onClick={toggleDropdown}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full"
              >
                {currency === 'BRL' ? (
                  <img src={Brl} alt="BRL" className="w-8 h-8" />
                ) : (
                  <img src={Usd} alt="USD" className="w-8 h-8" />
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
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center pt-4">
            <button
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

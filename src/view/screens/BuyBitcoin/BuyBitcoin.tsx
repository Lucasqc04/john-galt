import axios from 'axios';
import React, { SetStateAction, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import Usd from '../../assets/usd.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { useHeader } from '../../layout/Header/useHeader';

interface Rates {
  BRL: number;
  USD: number;
  BTC: number;
}

export default function BuyBitcoin() {
  const { theme } = useHeader();
  const navigate = useNavigate();
  const [action, setAction] = useState('Comprar');
  const [currency, setCurrency] = useState('BRL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number | string>('');
  const [convertedValue, setConvertedValue] = useState<number | string>('');
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    // Função para buscar as taxas de câmbio da API
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
    // Atualiza o valor convertido quando a moeda ou o valor de entrada mudam
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
      <div className="flex justify-center pb-8">
        <div className="flex space-x-4 pt-6">
          <div onClick={() => navigate('/sobre')}>
            <button className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]">
              Sobre
            </button>
          </div>
          <div onClick={() => navigate('/taxas')}>
            <button className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]">
              Taxas
            </button>
          </div>
          <div onClick={() => navigate('/termos')}>
            <button className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]">
              Termos
            </button>
          </div>
          <div onClick={() => navigate('/suporte')}>
            <button className="text-2xl lg:text-xl font-semibold leading-6 text-black dark:text-white hover:text-[#F6911D] dark:hover:text-[#F6911D]">
              Suporte
            </button>
          </div>
          <label className="inline-flex items-center relative cursor-pointer mr-4">
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
      <div className="pt-5 pb-9 flex justify-center">
        <div className="space-x-4 pt-6">
          <h1 className="text-black dark:text-white font-black text-7xl text-center">
            <span>DIY</span>
            <br />
            <span>SEC</span>
            <br />
            <span>LAB</span>
          </h1>
        </div>
      </div>
      <div className=" flex justify-center">
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
            <div className="relative ">
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

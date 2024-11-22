import { useState } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaBarcode, FaPix } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
// import Liquid from '../../assets/lbtc.svg';
import Lightning from '../../assets/lightning.svg';
// import Onchain from '../../assets/onchain.svg';
import { SiBitcoincash } from 'react-icons/si';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function BuyCheckout() {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const [network, setNetwork] = useState<string>('Rede do BTC');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMethod, setIsDropdownOpenMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'PIX' | 'Cartão de Crédito' | 'Boleto Bancário'
  >('PIX');

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const selectNetwork = (networkName: string) => {
    setNetwork(networkName);
    setIsDropdownOpen(false);
  };

  const toggleDropdownMethod = () => {
    setIsDropdownOpenMethod((prevState) => !prevState);
  };

  const selectPaymentMethod = (
    method: 'PIX' | 'Cartão de Crédito' | 'Boleto Bancário',
  ) => {
    setPaymentMethod(method);
    setIsDropdownOpenMethod(false);
  };

  const networks = [
    { name: 'Lightning', icon: Lightning },
    // { name: 'Onchain', icon: Onchain },
    // { name: 'Liquid', icon: Liquid },
  ];

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
      <div className="pt-[10%] pb-[10%] flex justify-center">
        <h1 className="text-[#F6911D] dark:text-[#F6911D] font-black text-7xl flex items-center">
          <SiBitcoincash className="mr-2" /> ALFRED
        </h1>
      </div>
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center items-center pt-4">
            <div className="relative">
              <input
                type="text"
                value={network}
                readOnly
                placeholder="Selecione uma rede"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 cursor-pointer"
                onClick={toggleDropdown}
              />
              <button
                onClick={toggleDropdown}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full"
              >
                {networks.find((net) => net.name === network)?.icon && (
                  <img
                    src={networks.find((net) => net.name === network)?.icon}
                    alt={network}
                    className="w-8 h-8"
                  />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <ul>
                    {networks.map((net) => (
                      <li
                        key={net.name}
                        onClick={() => selectNetwork(net.name)}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {net.name}
                        <img
                          src={net.icon}
                          alt={net.name}
                          className="w-8 h-8 ml-2"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center pt-4">
            <div className="relative">
              <input
                type="text"
                value={paymentMethod}
                readOnly
                placeholder="Selecione o método de pagamento"
                className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 cursor-pointer"
                onClick={toggleDropdownMethod}
              />
              <button
                onClick={toggleDropdownMethod}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full"
              >
                {paymentMethod === 'PIX' ? (
                  <FaPix className="w-8 h-8" />
                ) : paymentMethod === 'Cartão de Crédito' ? (
                  <CiCreditCard1 className="w-8 h-8" />
                ) : (
                  <FaBarcode className="w-8 h-8" />
                )}
              </button>
              {isDropdownOpenMethod && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    <li
                      onClick={() => selectPaymentMethod('PIX')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      PIX
                      <FaPix />
                    </li>
                    <li
                      onClick={() => selectPaymentMethod('Cartão de Crédito')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Cartão de Crédito
                      <CiCreditCard1 />
                    </li>
                    <li
                      onClick={() => selectPaymentMethod('Boleto Bancário')}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Boleto Bancário
                      <FaBarcode />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center pt-4">
            <button
              onClick={() => handleOnLink(ROUTES.copyCode.call(currentLang))}
              type="button"
              className="w-full h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold"
            >
              Prosseguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

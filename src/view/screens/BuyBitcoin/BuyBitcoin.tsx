import axios from 'axios'; // Importando o axios
import { useEffect, useState } from 'react';
import { SiBitcoincash } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import Lightning from '../../assets/lightning.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function BuyBitcoinAndCheckout() {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  const [currentStep, setCurrentStep] = useState<'buyBitcoin' | 'buyCheckout'>(
    'buyBitcoin',
  );

  const [brlAmount, setBrlAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [btcRate, setBtcRate] = useState(0);

  const [network, setNetwork] = useState<string>('Rede do BTC');
  const [paymentMethod, setPaymentMethod] = useState<
    'PIX' | 'Cartão de Crédito' | 'Boleto Bancário'
  >('PIX');

  useEffect(() => {
    const fetchBitcoinRate = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl',
        );
        const data = await response.json();
        setBtcRate(data.bitcoin.brl);
      } catch (error) {
        console.error('Error fetching Bitcoin rate:', error);
      }
    };

    if (currentStep === 'buyBitcoin') {
      fetchBitcoinRate();
    }
  }, [currentStep]);

  const formatBrl = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(numericValue) / 100);
    return numericValue ? formattedValue : '';
  };

  const handleBrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatBrl(value);
    setBrlAmount(formattedValue);

    if (btcRate > 0) {
      const numericValue = parseFloat(value.replace(/\D/g, '')) / 100;
      setBtcAmount((numericValue / btcRate).toFixed(8));
    }
  };

  const handleNextStep = () => {
    const numericValue = parseFloat(brlAmount.replace(/\D/g, '')) / 100;
    if (numericValue >= 500) {
      setCurrentStep('buyCheckout');
    } else {
      alert('O valor deve ser maior que R$500 para prosseguir.');
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const selectNetwork = (networkName: string) => {
    setNetwork(networkName);
    setIsDropdownOpen(false);
  };

  const [isDropdownOpenMethod, setIsDropdownOpenMethod] = useState(false);
  const toggleDropdownMethod = () => setIsDropdownOpenMethod((prev) => !prev);

  const selectPaymentMethod = (
    method: 'PIX' | 'Cartão de Crédito' | 'Boleto Bancário',
  ) => {
    setPaymentMethod(method);
    setIsDropdownOpenMethod(false);
  };

  const networks = [{ name: 'Lightning', icon: Lightning }];

  const handleFinalizarCompra = async () => {
    const amountBtc = parseFloat(btcAmount);

    const data = {
      amountBtc,
      paymentMethod,
      network: 'lightning',
    };

    try {
      // Enviando dados para a API com axios
      const response = await axios.post(
        'https://automatic-halibut-rj9w96r756wcp6p9-3000.app.github.dev/orders/create-order',
        data,
      );

      // Salva o ID no localStorage
      const orderId = response.data.order.id;
      localStorage.setItem('orderId', orderId);

      alert('Compra finalizada com sucesso!');
      console.log(response.data);

      handleOnLink(ROUTES.copyCode.call(currentLang));
    } catch (error) {
      console.error('Erro ao finalizar a compra:', error);
      alert('Ocorreu um erro ao finalizar a compra.');
    }
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

      {currentStep === 'buyBitcoin' && (
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center items-center space-x-4">
              <div className="relative">
                <input
                  value={brlAmount}
                  onChange={handleBrlChange}
                  placeholder="Digite o valor em BRL"
                  className="border pl-20 pr-20 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 text-center no-arrows"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full">
                  <img src={Brl} alt="BRL" className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center pt-4">
              <div className="relative">
                <input
                  value={btcAmount}
                  readOnly
                  placeholder="Valor em BTC"
                  className="border pl-20 pr-20 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 text-center no-arrows"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 rounded-full">
                  <img src={Btc} alt="Bitcoin" className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center pt-4">
              <button
                onClick={handleNextStep}
                type="button"
                className="w-full h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold"
              >
                Prosseguir
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'buyCheckout' && (
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
                ></button>
                {isDropdownOpenMethod && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul>
                      <li
                        onClick={() => selectPaymentMethod('PIX')}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        PIX
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center items-center pt-4">
              <button
                onClick={handleFinalizarCompra}
                type="button"
                className="w-full h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

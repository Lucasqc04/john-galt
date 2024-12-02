import axios from 'axios';
import classNames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaBarcode, FaPix } from 'react-icons/fa6';
import { SiBitcoincash } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Lightning from '../../assets/lightning.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { NavBarBuyBitcoin } from './NavbarBuyBitcoin';

export default function BuyCheckout() {
  const [network, setNetwork] = useState<string>('Rede do BTC');
  const [coldWallet, setColdWallet] = useState<string>('');
  const [transactionNumber, setTransactionNumber] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMethod, setIsDropdownOpenMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'PIX' | 'Cartão de Crédito' | 'Boleto Bancário'
  >('PIX');
  const [pixKey, setPixKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brlAmount, setBrlAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [, setIsWaitingForPayment] = useState(false);
  const [acceptFees, setAcceptFees] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();

  useEffect(() => {
    const storedBrl = localStorage.getItem('brlAmount');
    const storedBtc = localStorage.getItem('btcAmount');
    if (storedBrl && storedBtc) {
      setBrlAmount(storedBrl);
      setBtcAmount(storedBtc);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handlesColdWallet = (event: ChangeEvent<HTMLInputElement>) => {
    setColdWallet(event.target.value);
  };
  const handlesTransactionNumbe = (event: ChangeEvent<HTMLInputElement>) => {
    setTransactionNumber(event.target.value);
  };
  const selectNetwork = (networkName: string) => {
    setNetwork(networkName);
    setIsDropdownOpen(false);
  };

  const toggleDropdownMethod = () => {
    setIsDropdownOpenMethod((prevState) => !prevState);
  };

  const selectPaymentMethod = (method: 'PIX') => {
    setPaymentMethod(method);
    setIsDropdownOpenMethod(false);
  };

  const networks = [{ name: 'Lightning', icon: Lightning }];

  const handleProcessPayment = async () => {
    if (!acceptFees || !acceptTerms) {
      alert('Você precisa aceitar as taxas e os termos de uso.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/create-order`,
        {
          amountBrl: parseFloat(brlAmount.replace(/\D/g, '')) / 100,
          amountBtc: parseFloat(btcAmount),
          paymentMethod,
          network: network.toLowerCase(),
          coldWallet,
          transactionNumber,
        },
      );

      const pixKey = response.data.order.pixKey;
      setPixKey(pixKey);

      setIsLoading(false);

      verifyPaymentStatus(response.data.order.id);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar o pagamento.');
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey);
      alert('Chave PIX copiada para a área de transferência!');
    }
  };

  const verifyPaymentStatus = async (orderId: string) => {
    setIsWaitingForPayment(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/confirm-payment`,
        {
          orderId,
        },
      );

      console.log(response);

      if (response.data === 'confirmed') {
        alert('Pagamento confirmado!');
        navigate(ROUTES.paymentStatus.success.call(currentLang));
      } else {
        alert('Pagamento ainda não confirmado. Tente novamente.');
        navigate(ROUTES.paymentStatus.failure.call(currentLang));
      }
    } catch (error) {
      console.error('Erro ao verificar o status do pagamento:', error);
      alert('Erro ao verificar o status do pagamento.');
    } finally {
      setIsWaitingForPayment(false);
    }
  };

  return (
    <div>
      <BackgroundAnimatedProduct />
      <NavBarBuyBitcoin />
      <div className="pt-[10%] pb-[10%] lg:pt-8 lg:pb-8 flex items-center justify-center">
        <h1 className="text-[#F6911D] dark:text-[#F6911D] font-black text-7xl flex items-center gap-x-4">
          <SiBitcoincash /> ALFRED
        </h1>
      </div>
      <div className="flex justify-center">
        <div>
          <p className="text-xl text-center text-black dark:text-white">
            Valor: {brlAmount} BRL
            <br /> Valor: {btcAmount} BTC
          </p>

          {pixKey ? (
            <div className="flex flex-col items-center pt-4">
              <p className="text-xl text-center text-black dark:text-white mb-4">
                Escaneie o QR Code ou copie a chave PIX abaixo:
              </p>

              <QRCodeSVG value={pixKey} size={256} />

              <textarea
                value={pixKey}
                readOnly
                className="border px-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 w-full mt-4"
                rows={6}
              />

              <button
                onClick={copyToClipboard}
                className="mt-4 px-6 py-3 bg-[#F6911D] text-white rounded-3xl font-bold"
              >
                Copiar Chave PIX
              </button>
            </div>
          ) : (
            <>
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
                    <div className="absolute z-50 right-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul>
                        <li
                          onClick={() => selectPaymentMethod('PIX')}
                          className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          PIX
                          <FaPix />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center pt-4">
                <div className="relative">
                  <input
                    value={coldWallet}
                    onChange={handlesColdWallet}
                    placeholder="Endereço de Bitcoin"
                    className="border pl-28 pr-6 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center pt-4">
                <div className="relative">
                  <input
                    value={transactionNumber}
                    onChange={handlesTransactionNumbe}
                    placeholder="Telefone"
                    className="border pl-28 pr-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-start pt-4">
                <label className="flex items-center dark:text-white">
                  <input
                    type="checkbox"
                    checked={acceptFees}
                    onChange={() => setAcceptFees(!acceptFees)}
                    className="mr-2"
                  />
                  ACEITO AS TAXAS
                </label>
                <label className="flex items-center dark:text-white">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="mr-2"
                  />
                  ACEITO OS TERMOS DE USO
                </label>
              </div>

              <div className="flex justify-center items-center pt-4">
                {isLoading ? (
                  <p className="text-lg font-bold text-[#F6911D]">
                    Carregando...
                  </p>
                ) : (
                  <button
                    onClick={handleProcessPayment}
                    type="button"
                    disabled={!acceptFees || !acceptTerms}
                    className={classNames(
                      'w-full h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold',
                      (!acceptFees || !acceptTerms) && 'opacity-50',
                    )}
                  >
                    Obter Chave PIX
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

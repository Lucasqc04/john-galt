import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import WhatsAppButton from '../../components/buttonWhatsApp';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import HeaderAlfred from './HeaderAlfred';

export default function BuyBitcoinAndCheckout() {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();

  const [brlAmount, setBrlAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [btcRate, setBtcRate] = useState(0);
  const [isTransactionAllowed, setIsTransactionAllowed] = useState(true);

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

    fetchBitcoinRate();

    const timeZone = 'America/Sao_Paulo';
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = zonedTime.getHours();

    if (currentHour < 8 || currentHour >= 20) {
      setIsTransactionAllowed(false);
    }
  }, []);

  const handleBrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      setBrlAmount('');
      setBtcAmount('');
      return;
    }

    if (numericValue > 5000) {
      return;
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(numericValue);

    setBrlAmount(formattedValue);

    if (btcRate > 0 && numericValue >= 0) {
      setBtcAmount((numericValue / btcRate).toFixed(8));
    }
  };

  const handleNextStep = () => {
    if (!isTransactionAllowed) {
      alert(
        'Transações só são permitidas todos os dias, das 8h às 20h no horário de Brasília.',
      );
      return;
    }

    const numericValue = parseInt(brlAmount.replace(/\D/g, ''), 10);
    if (numericValue >= 700 && numericValue <= 5000) {
      localStorage.setItem('brlAmount', brlAmount);
      localStorage.setItem('btcAmount', btcAmount);
      navigate(ROUTES.buyCheckout.call(currentLang));
    } else {
      alert(
        'O valor deve ser maior que R$700 e menor que R$5000 para prosseguir.',
      );
    }
  };

  return (
    <div>
      <BackgroundAnimatedProduct />
      <HeaderAlfred />
      <div className="lg:pt-[5%] lg:pb-[3%]  pt-[20%] pb-[3%] flex items-center justify-center mt-[10%] sm:mt-[5%] lg:mt-[2%]">
        <h1 className="text-[#F6911D] dark:text-[#F6911D] font-black text-5xl sm:text-6xl lg:text-7xl flex items-center">
          ALFRED
        </h1>
      </div>

      {!isTransactionAllowed && (
        <div className="text-red-500 text-center font-bold">
          Transações só são permitidas todos os dias, das 8h às 20h no horário
          de Brasília.
        </div>
      )}

      <div className="flex justify-center px-4 sm:px-8 lg:px-0">
        <div className="w-full max-w-lg">
          <div className="flex justify-center items-center space-x-4">
            <div className="relative w-full">
              <input
                value={brlAmount}
                onChange={handleBrlChange}
                placeholder="Digite o valor em BRL"
                className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 text-center w-full"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                <img src={Brl} alt="BRL" className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center pt-4">
            <div className="relative w-full">
              <input
                value={btcAmount}
                readOnly
                placeholder="Valor em BTC"
                className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg text-black dark:text-white bg-slate-100 dark:bg-slate-700 text-center w-full"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                <img
                  src={Btc}
                  alt="Bitcoin"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center pt-4">
            <button
              onClick={handleNextStep}
              type="button"
              className="w-full h-10 sm:h-12 bg-[#F6911D] text-black dark:text-white rounded-3xl font-bold text-sm sm:text-base"
            >
              Prosseguir
            </button>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}

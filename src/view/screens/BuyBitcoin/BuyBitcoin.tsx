import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AlfredImg from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';
import Btc from '../../assets/bitcoin.svg';
import Brl from '../../assets/brl.svg';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export default function BuyBitcoinAndCheckout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();

  const [brlAmount, setBrlAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [btcRate, setBtcRate] = useState(0);
  const [isTransactionAllowed, setIsTransactionAllowed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(import.meta.env.VITE_API_URL);
    };
    fetchData();
  }, []);

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
      alert(t('checkout.transaction_error'));
      return;
    }

    const numericValue = parseInt(brlAmount.replace(/\D/g, ''), 10);
    if (numericValue >= 700 && numericValue <= 5000) {
      localStorage.setItem('brlAmount', brlAmount);
      localStorage.setItem('btcAmount', btcAmount);
      navigate(ROUTES.buyCheckout.call(currentLang));
    } else {
      alert(t('checkout.amount_error'));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 lg:px-16 lg:pt-[5%] lg:pb-[3%] pt-[20%] pb-[3%]">
          <div className="w-full lg:w-1/2">
            <div className="lg:pt-[5%] lg:pb-[3%] pt-[20%] pb-[3%] flex items-center justify-center mt-[10%] sm:mt-[5%] lg:mt-[2%]">
              <h1 className="text-[#F39200] dark:text-[#F39200] font-black text-5xl sm:text-6xl lg:text-7xl flex items-center">
                ALFRED
              </h1>
            </div>

            {!isTransactionAllowed && (
              <div className="text-red-500 text-center font-bold">
                {t('checkout.transaction_error')}
              </div>
            )}

            <div className="flex justify-center px-4 sm:px-8 lg:px-0">
              <div className="w-full max-w-lg">
                <div className="flex justify-center items-center space-x-4">
                  <div className="relative w-full">
                    <input
                      value={brlAmount}
                      onChange={handleBrlChange}
                      placeholder={t('checkout.brl_placeholder')}
                      className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] text-center w-full"
                    />
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                      <img
                        src={Brl}
                        alt={t('checkout.brl_label')}
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center items-center pt-4">
                  <div className="relative w-full">
                    <input
                      value={btcAmount}
                      readOnly
                      placeholder={t('checkout.btc_placeholder')}
                      className="border pl-16 pr-16 py-3 rounded-3xl text-base sm:text-lg text-black dark:placeholder-white placeholder-[#606060] bg-slate-100 dark:bg-[#B9B8B8] text-center w-full"
                    />
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                      <img
                        src={Btc}
                        alt={t('checkout.btc_label')}
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-center items-center pt-4">
                  <button
                    onClick={handleNextStep}
                    type="button"
                    className="w-full h-10 sm:h-12 bg-[#F39200] text-white rounded-3xl font-bold text-sm sm:text-base"
                  >
                    {t('checkout.proceed_button')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <img
              src={AlfredImg}
              alt="Imagem Alfred"
              className="w-3/4 lg:w-full max-w-md lg:max-w-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full py-6 mt-16 mb-[10%] flex justify-center">
        <div className="text-center px-4 sm:px-8 lg:px-16">
          <p className="text-xl sm:text-2xl lg:text-3xl dark:text-white">
            Com o ALFRED, você pode adquirir seus BITCOINS de maneira simples e
            enviá-los diretamente para sua carteira offline, garantindo total
            privacidade e segurança.
          </p>
        </div>
      </div>
    </>
  );
}

import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import SocialButtons from '@/view/components/SocialButtons';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    if (currentHour < 8 || currentHour >= 22) {
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
      toast.error(t('checkout.transaction_error'));
      return;
    }

    const numericValue = parseInt(brlAmount.replace(/\D/g, ''), 10);
    if (numericValue >= 700 && numericValue <= 5000) {
      localStorage.setItem('brlAmount', brlAmount);
      localStorage.setItem('btcAmount', btcAmount);
      navigate(ROUTES.buyCheckout.call(currentLang));
    } else {
      toast.warning(t('checkout.amount_error'));
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center w-full max-w-screen-xl px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 pt-12 sm:pt-28 mx-auto">
        <section className="w-full max-w-screen-lg flex flex-col lg:flex-row items-center justify-center mx-auto">
          <article className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-y-10">
            <img
              src={AlfredWhiteLogo}
              alt="Alfred Logo"
              className="w-44 sm:w-60"
            />
            <form
              className="flex flex-col justify-center items-center w-full max-w-2xl"
              onSubmit={handleNextStep}
            >
              {!isTransactionAllowed && (
                <span className="text-red-500 text-center font-bold pb-4">
                  {t('checkout.transaction_error')}
                </span>
              )}
              <div className="w-full flex justify-center items-center">
                <div className="relative w-full">
                  <input
                    value={brlAmount}
                    onChange={handleBrlChange}
                    placeholder={t('checkout.brl_placeholder')}
                    className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-transparent text-center w-full"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                    <img
                      src={Brl}
                      alt={t('checkout.brl_label')}
                      className="w-6 h-6 sm:w-10 sm:h-10"
                    />
                  </button>
                </div>
              </div>

              <div className="w-full flex justify-center items-center pt-4">
                <div className="relative w-full">
                  <input
                    value={btcAmount}
                    readOnly
                    placeholder={t('checkout.btc_placeholder')}
                    className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-transparent text-center w-full"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                    <img
                      src={Btc}
                      alt={t('checkout.btc_label')}
                      className="w-6 h-6 sm:w-10 sm:h-10"
                    />
                  </button>
                </div>
              </div>

              <div className="w-full flex justify-center items-center pt-4">
                <button
                  type="submit"
                  className="w-full h-10 sm:h-12 bg-[#F39200] text-white rounded-3xl font-bold text-sm sm:text-base border-2"
                >
                  {t('checkout.proceed_button')}
                </button>
              </div>

              <section className="hidden lg:flex items-center justify-center h-full mt-8 text-center">
                <p className="text-white">
                  <b>BITCOIN</b> na sua mão, sem complicação e
                  <b> com privacidade</b>.
                </p>
              </section>
            </form>
          </article>

          <article className="w-full lg:w-1/2 flex justify-center">
            <img
              src={AlfredImg}
              alt="Imagem Alfred"
              className="w-full max-w-md lg:max-w-full"
            />
          </article>

          <section className="lg:hidden mt-8 mb-[10%] text-center">
            <p className="text-white">
              <b>BITCOIN</b> na sua mão, sem complicação e
              <b> com privacidade</b>.
            </p>
          </section>
        </section>

        <div className="flex justify-center w-full">
          <SocialButtons />
        </div>
      </main>
    </>
  );
}

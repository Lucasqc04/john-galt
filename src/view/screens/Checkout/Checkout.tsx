import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import SocialButtons from '@/view/components/SocialButtons';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';
import AlfredImg from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';
import BtcIcon from '../../assets/bitcoin.svg';
import UsdtIcon from '../../assets/usdt.svg';
import { useCheckout } from './useCheckout';
import { ValuesForm } from './ValuesForm/ValuesForm';

export default function Checkout() {
  const { t } = useTranslation();
  const { form, steps, isTransactionAllowed, ValidateValues, isAlfred24h } =
    useCheckout();
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC');
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');

  // Variável para ativar/desativar o modo de manutenção
  const [isMaintenanceMode] = useState(false);

  const toggleTransactionType = () => {
    setTransactionType((prevType) => (prevType === 'buy' ? 'sell' : 'buy'));
  };

  const handleProceedClick = () => {
    if (transactionType === 'sell') {
      const brlAmount = form.getValues('brlAmount');
      const cryptoAmount = form.getValues('cryptoAmount');
      const cryptoType = form.getValues('cryptoType');

      const whatsappNumber = '5511911872097';
      const message = `Olá! Estou interessado em realizar uma venda de ${cryptoType}.
      Valor em BRL: ${brlAmount}
      Quantidade de ${cryptoType}: ${cryptoAmount}`;

      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappLink;
    } else {
      ValidateValues(form.getValues());
    }
  };

  return (
    <>
      <div className="relative w-full">
        {isMaintenanceMode && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 text-white text-center p-6 z-10">
            <h1 className="text-4xl font-bold mb-4 text-yellow-500">
              🚧 Alfred em Manutenção 🚧
            </h1>
            <p className="text-lg max-w-lg">
              Estamos realizando melhorias para oferecer um serviço ainda
              melhor. Voltaremos em algumas horas! Agradecemos sua paciência.
            </p>
            <p>
              Para qualquer dúvida, contate-nos no suporte, ou em nossas redes.
            </p>
          </div>
        )}
        <main className="flex flex-col justify-center items-center w-full max-w-screen-xl px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40 pt-12 sm:pt-28 mx-auto">
          <section className="w-full max-w-screen-lg flex flex-col lg:flex-row items-center justify-center mx-auto">
            <article className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-y-4">
              <img
                src={AlfredWhiteLogo}
                alt="Alfred Logo"
                className="w-44 sm:w-60"
              />
              <FormProvider {...form}>
                <form className="flex flex-col justify-center items-center w-full max-w-2xl space-y-2">
                  {!isTransactionAllowed && (
                    <span className="text-red-500 text-center font-bold pb-2">
                      {t('checkout.transaction_error')}
                    </span>
                  )}
                  <div className="flex justify-center w-full items-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => setSelectedCrypto('BTC')}
                        className={`group flex items-center justify-center gap-2 border border-white rounded-full px-4 py-1.5 text-white transition-colors duration-200 ${selectedCrypto === 'BTC' ? 'bg-orange-500' : 'bg-transparent hover:bg-orange-500'}`}
                      >
                        <img
                          src={BtcIcon}
                          alt="BTC"
                          className="w-4 h-4 hidden group-hover:block"
                        />
                        BTC
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCrypto('USDT')}
                        className={`group flex items-center justify-center gap-2 border border-white rounded-full px-3 py-1 text-white transition-colors duration-200 ${selectedCrypto === 'USDT' ? 'bg-orange-500' : 'bg-transparent hover:bg-orange-500'}`}
                      >
                        <img
                          src={UsdtIcon}
                          alt="USDT"
                          className="w-4 h-4 hidden group-hover:block"
                        />
                        USDT
                      </button>
                    </div>

                    {isAlfred24h ? (
                      <div className="ml-4">
                        <div
                          className={`flex items-center gap-2 text-lg font-bold text-green-500 `}
                        >
                          <FaPlay size={24} />
                          <span className="text-3xl">24H</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {steps.current === 1 && (
                    <ValuesForm
                      selectedCrypto={selectedCrypto}
                      transactionType={transactionType}
                      toggleTransactionType={toggleTransactionType}
                    />
                  )}

                  {steps.current === 1 && (
                    <>
                      <div className="w-full flex justify-center items-center pt-2">
                        <button
                          type="button"
                          onClick={handleProceedClick}
                          className={`w-full h-10 sm:h-12 rounded-3xl font-bold text-sm sm:text-base border-2 transition-colors duration-200 ${
                            parseInt(
                              form.getValues('brlAmount').replace(/\D/g, ''),
                              10,
                            ) < 100 || isMaintenanceMode
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-[#F39200] text-white'
                          }`}
                          disabled={
                            parseInt(
                              form.getValues('brlAmount').replace(/\D/g, ''),
                              10,
                            ) < 100 || isMaintenanceMode
                          }
                        >
                          {isMaintenanceMode
                            ? '🚧 Site em Manutenção 🚧'
                            : t('checkout.proceed_button')}
                        </button>
                      </div>
                      <section className="hidden lg:flex items-center justify-center text-center">
                        <p className="text-white">
                          {t('checkout.bitcoin_message')}
                        </p>
                      </section>

                      {isAlfred24h && (
                        <section className="hidden lg:flex items-center justify-center text-center">
                          <p className="text-white">
                            {t('checkout.opening_hours')}
                          </p>
                        </section>
                      )}
                    </>
                  )}
                </form>
              </FormProvider>
            </article>
            <article className="w-full lg:w-1/2 flex justify-center">
              <img
                src={AlfredImg}
                alt="Imagem Alfred"
                className="w-full max-w-md lg:max-w-full image-step"
              />
            </article>
            <section className="lg:hidden mt-4 mb-4 text-center">
              <p className="text-white">{t('checkout.bitcoin_message')}</p>
            </section>
          </section>
          {isAlfred24h && (
            <section className="lg:hidden mt-4 mb-4 text-center">
              <p className="text-white">{t('checkout.opening_hours')}</p>
            </section>
          )}
          <div className="flex justify-center w-full">
            <SocialButtons />
          </div>
        </main>
      </div>
    </>
  );
}

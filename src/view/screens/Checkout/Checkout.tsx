import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import SocialButtons from '@/view/components/SocialButtons';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AlfredImg from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';
import BtcIcon from '../../assets/bitcoin.svg';
import UsdtIcon from '../../assets/usdt.svg';
import { useCheckout } from './useCheckout';
import { ValuesForm } from './ValuesForm/ValuesForm';

export default function Checkout() {
  const { t } = useTranslation();
  const { form, steps, isTransactionAllowed, ValidateValues } = useCheckout();
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'USDT'>('BTC');

  return (
    <>
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

                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('BTC')}
                    className={`group flex items-center justify-center gap-2 border border-white rounded-full px-3 py-1 text-white transition-colors duration-200 ${
                      selectedCrypto === 'BTC'
                        ? 'bg-orange-500'
                        : 'bg-transparent hover:bg-orange-500'
                    }`}
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
                    className={`group flex items-center justify-center gap-2 border border-white rounded-full px-3 py-1 text-white transition-colors duration-200 ${
                      selectedCrypto === 'USDT'
                        ? 'bg-orange-500'
                        : 'bg-transparent hover:bg-orange-500'
                    }`}
                  >
                    <img
                      src={UsdtIcon}
                      alt="USDT"
                      className="w-4 h-4 hidden group-hover:block"
                    />
                    USDT
                  </button>
                </div>
                {steps.current === 1 && (
                  <ValuesForm selectedCrypto={selectedCrypto} />
                )}
                {steps.current === 1 && (
                  <>
                    <div className="w-full flex justify-center items-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const numericValue = parseInt(
                            form.getValues('brlAmount').replace(/\D/g, ''),
                            10,
                          );
                          if (numericValue < 200) {
                            toast.warning(t('checkout.min_value_error'));
                            return;
                          }
                          ValidateValues(form.getValues());
                        }}
                        className={`w-full h-10 sm:h-12 rounded-3xl font-bold text-sm sm:text-base border-2 transition-colors duration-200 ${
                          parseInt(
                            form.getValues('brlAmount').replace(/\D/g, ''),
                            10,
                          ) < 200
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#F39200] text-white'
                        }`}
                        disabled={
                          parseInt(
                            form.getValues('brlAmount').replace(/\D/g, ''),
                            10,
                          ) < 200
                        }
                      >
                        {t('checkout.proceed_button')}
                      </button>
                    </div>
                    <section className="hidden lg:flex items-center justify-center text-center">
                      <p className="text-white">
                        {t('checkout.bitcoin_message')}
                      </p>
                    </section>
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
        <div className="flex justify-center w-full">
          <SocialButtons />
        </div>
      </main>
    </>
  );
}

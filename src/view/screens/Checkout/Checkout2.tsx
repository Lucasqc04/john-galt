import AlfredWhiteLogo from '@/view/assets/logo/alfred-white-logo.svg';
import SocialButtons from '@/view/components/SocialButtons';
import { FormProvider } from 'react-hook-form';
import AlfredImg from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';

import { useCheckout } from './useCheckout2';
import { ValuesForm } from './ValuesForm/ValuesForm';

export default function Checkout() {
  const { t, form, steps, isTransactionAllowed, ValidateValues } =
    useCheckout();

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
            <FormProvider {...form}>
              <form className="flex flex-col justify-center items-center w-full max-w-2xl">
                {!isTransactionAllowed && (
                  <span className="text-red-500 text-center font-bold pb-4">
                    {t('checkout.transaction_error')}
                  </span>
                )}
                {steps.current === 1 && <ValuesForm />}

                {steps.current === 1 && (
                  <>
                    <div className="w-full flex justify-center items-center pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          ValidateValues(form.getValues());
                        }}
                        className="w-full h-10 sm:h-12 bg-[#F39200] text-white rounded-3xl font-bold text-sm sm:text-base border-2 proceed-button-step"
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

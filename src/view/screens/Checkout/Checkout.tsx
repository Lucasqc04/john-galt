import { FormProvider } from 'react-hook-form';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdCreditCard, MdHome, MdPerson } from 'react-icons/md';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { Loader } from '../../components/Loader';
import { AddressForm } from './AddressForm/AddressForm';
import { ConfirmInfos } from './ConfirmInfos/ConfirmInfos';
import { PaymentForm } from './PaymentForm/PaymentForm';
import { PaymentOptions } from './PaymentOption/PaymentOption';
import { PersonForm } from './PersonForm/PersonForm';
import { ShippingForm } from './ShippingForm/ShippingForm';
import { StepIndicator } from './StepIndicator';
import { useCheckout } from './useCheckout';

export function Checkout() {
  const { t, form, steps, loading, navigate } = useCheckout();

  return (
    <>
      {loading && <Loader />}
      <main className="px-4 py-8 grid grid-cols-12 gap-y-4 dark:bg-primary-dark">
        <header className="col-span-12 flex items-start justify-between dark:text-white">
          <div className="flex items-center gap-x-4">
            <button onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack
                size={28}
                className="text-gray-900 dark:text-white"
              />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t('checkout.title')}
            </h1>
          </div>
          <LanguageSwitcher />
        </header>
        <article className="col-span-12 w-full">
          <div className="w-full max-w-3xl">
            <StepIndicator
              currentStep={steps.current}
              stepRanges={{
                1: [1],
                2: [2, 3],
                3: [4, 5, 6],
              }}
              steps={[
                {
                  icon: <MdPerson size={18} className="text-white" />,
                },
                {
                  icon: <MdHome size={18} className="text-white" />,
                },
                {
                  icon: <MdCreditCard size={18} className="text-white" />,
                },
              ]}
            />
          </div>
        </article>
        <article className="col-span-12">
          <h3 className="text-xl border-b border-solid border-black leading-9 dark:text-white dark:border-white">
            {steps.current === 1 && t('checkout.stepInfos')}
            {steps.current === 2 && t('checkout.stepAddress')}
            {steps.current === 3 && t('checkout.stepShipping')}
            {steps.current === 4 && t('checkout.choosePaymentMethod')}
            {steps.current === 5 && t('checkout.stepPayment')}
            {steps.current === 6 && t('checkout.confirmInfos')}
          </h3>
          <FormProvider {...form}>
            <form>
              <div className="flex flex-col gap-y-2 pt-4">
                {steps.current === 1 && <PersonForm />}
                {steps.current === 2 && <AddressForm />}
                {steps.current === 3 && <ShippingForm />}
                {steps.current === 4 && <PaymentOptions />}
                {steps.current === 5 && <PaymentForm />}
                {steps.current === 6 && <ConfirmInfos />}
              </div>
              <div className="w-full flex justify-between py-4 gap-x-2">
                {steps.current > 1 && (
                  <button
                    type="button"
                    onClick={steps.prev}
                    className="w-48 bg-gray-500 text-white p-2 rounded-md font-semibold dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    {t('checkout.prev')}
                  </button>
                )}
                {steps.current < 6 && (
                  <button
                    type="button"
                    onClick={steps.next}
                    className="w-full bg-orange-primary text-white p-2 rounded-md font-semibold hover:bg-orange-500 transition-colors "
                    disabled={
                      steps.current === 2 &&
                      form.getValues('address.zipCode').length !== 8
                    }
                  >
                    {t('checkout.next')}
                  </button>
                )}
                {steps.current === 6 && (
                  <button
                    type="submit"
                    className={`w-full p-2 text-lg font-semibold text-white rounded-md transition-colors bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700`}
                  >
                    {t('checkout.finalizePayment')}
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        </article>
      </main>
    </>
  );
}

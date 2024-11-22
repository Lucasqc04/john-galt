import { FormProvider } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdCreditCard, MdHome, MdPerson } from 'react-icons/md';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
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
  const {
    t,
    form,
    items,
    steps,
    loading,
    subtotal,
    shippingPrice,
    onsubmit,
    navigate,
    removeCartItem,
    updateItemQuantity,
  } = useCheckout();

  return (
    <>
      {loading && <Loader />}
      <BackgroundAnimatedProduct />
      <main className="px-4 lg:px-8 py-6 grid grid-cols-12 gap-y-2">
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
        <article className="col-span-12 lg:col-span-6">
          <h3 className="text-xl border-b border-solid border-black leading-9 dark:text-white dark:border-white">
            {steps.current === 1 && t('checkout.stepInfos')}
            {steps.current === 2 && t('checkout.stepAddress')}
            {steps.current === 3 && t('checkout.stepShipping')}
            {steps.current === 4 && t('checkout.choosePaymentMethod')}
            {steps.current === 5 && t('checkout.stepPayment')}
            {steps.current === 6 && t('checkout.confirmInfos')}
          </h3>
          <FormProvider {...form}>
            <form onSubmit={onsubmit}>
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
                      form.getValues('address.zipCode')?.length !== 8
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
        <article className="col-span-6 hidden lg:flex lg:pl-32">
          <aside className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('checkout.cartItems')}
            </h2>
            <ul className="flex flex-col gap-y-4 pt-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-700"
                >
                  <div className="flex items-center gap-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-300">
                        {t('checkout.price', {
                          price: item.price.toFixed(2),
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        className="text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <TiArrowSortedUp size={24} />
                      </button>
                      <button
                        type="button"
                        className="text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateItemQuantity(item.id, item.quantity - 1);
                          }
                        }}
                      >
                        <TiArrowSortedDown size={24} />
                      </button>
                    </div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                      {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => removeCartItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col p-4 gap-y-2 border-t border-b border-gray-300 dark:border-gray-600">
              <div className="w-full flex justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('checkout.subtotal')}
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  R$ {(subtotal ?? 0).toFixed(2)}
                </span>
              </div>
              <div className="w-full flex justify-between ">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('checkout.shipping')}
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  R$ {Number(shippingPrice ?? 0).toFixed(2)}
                </span>
              </div>
              <div className="w-full flex justify-between ">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('checkout.discount')}
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  -R$ {Number(form.watch('discount') ?? 0).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between p-4">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('checkout.total')}
              </span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                R$ {Number(form.watch('total') ?? 0).toFixed(2)}
              </span>
            </div>
          </aside>
        </article>
      </main>
    </>
  );
}

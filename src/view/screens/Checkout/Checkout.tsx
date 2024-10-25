import { FormProvider } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Loader } from '../../components/Loader';
import { AddressForm } from './AddressForm';
import { PersonForm } from './PersonForm';
import { StepIndicator } from './StepIndicator';
import { useCheckout } from './useCheckout';

export function Checkout() {
  const { loading, form, cart, navigate, steps, applyCoupon, isValid } =
    useCheckout();

  return (
    <>
      {loading && <Loader />}
      <main className="min-h-screen flex flex-col px-4 py-8 bg-white dark:bg-gray-900">
        <header className="flex gap-x-4 items-center">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack
              size={28}
              className="text-gray-900 dark:text-white"
            />
          </button>
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </header>
        <StepIndicator
          currentStep={steps.current}
          steps={[{ title: 'Infos' }, { title: 'Endereço' }]}
        />
        <FormProvider {...form.provider}>
          <form
            onSubmit={form.submit}
            className="w-full flex flex-col lg:flex-row gap-x-4"
          >
            <article className="w-full lg:w-2/3">
              <div className="flex flex-col gap-y-2 pt-4">
                {steps.current === 1 && <PersonForm />}
                {steps.current === 2 && <AddressForm />}
              </div>

              <div className="w-full flex justify-between py-4">
                {steps.current > 1 && (
                  <button
                    type="button"
                    onClick={steps.prev}
                    className="w-48 bg-gray-500 text-white p-2 rounded-md font-semibold dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Voltar
                  </button>
                )}
                {steps.current < 2 && (
                  <button
                    type="button"
                    onClick={steps.next}
                    className="w-48 bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Próximo
                  </button>
                )}
              </div>
            </article>
            <aside className="w-full lg:w-1/3 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Itens no Carrinho
              </h2>
              <ul className="flex flex-col gap-y-4 pt-4">
                {cart.items.map((item) => (
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
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() =>
                            cart.updateItemQuantity(item.id, item.quantity + 1)
                          }
                          className="text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"
                        >
                          <TiArrowSortedUp size={24} />
                        </button>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              cart.updateItemQuantity(
                                item.id,
                                item.quantity - 1,
                              );
                            }
                          }}
                          className="text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300"
                        >
                          <TiArrowSortedDown size={24} />
                        </button>
                      </div>
                      <p className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                        {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => cart.remove(item.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="py-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Código do Cupom
                </label>
                <div className="flex gap-x-2 mt-2">
                  <input
                    type="text"
                    {...form.register('couponCode')}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {form.errors.couponCode && (
                  <span className="text-red-500 text-sm mt-1">
                    {form.errors.couponCode.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col p-4 gap-y-2 border-t border-b border-gray-300 dark:border-gray-600">
                <div className="w-full flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subtotal
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    R$ {cart.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="w-full flex justify-between ">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Frete
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    R$ {cart.shipping.value.toFixed(2)}
                  </span>
                </div>
                {cart.discount.value > 0 && (
                  <div className="w-full flex justify-between ">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Desconto
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      -R$ {cart.discount.value.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-between p-4">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>

              {steps.current === 2 && cart.shippingOptions.length > 0 && (
                <>
                  <div className="py-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Escolha uma opção de frete
                    </h3>
                    <ul>
                      {cart.shippingOptions.map((option) => (
                        <li
                          key={option.id}
                          className="text-gray-900 dark:text-white"
                        >
                          <label>
                            <input
                              type="radio"
                              name="shippingOption"
                              value={option.id}
                              onChange={() => cart.onShippingSelect(option)}
                              className="mr-2"
                            />
                            {option.name} - R${' '}
                            {parseFloat(option.price).toFixed(2)} -{' '}
                            {option.deliveryTime} dias
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-blue-500 text-white p-2 mt-6 rounded-md font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Finalizar Pagamento
                  </button>
                </>
              )}
            </aside>
          </form>
        </FormProvider>
      </main>
    </>
  );
}

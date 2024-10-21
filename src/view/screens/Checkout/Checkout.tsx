import { FormProvider } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { AddressForm } from './AddressForm';
import { PersonForm } from './PersonForm';
import { StepIndicator } from './StepIndicator';
import { useCheckout } from './useCheckout';

export function Checkout() {
  const { form, cart, navigate, steps } = useCheckout();

  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
      <header className="flex gap-x-4 items-center">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack size={28} />
        </button>
        <h1 className="text-4xl font-semibold">Checkout</h1>
      </header>
      <StepIndicator
        currentStep={steps.current}
        steps={[{ title: 'Infos' }, { title: 'Endereço' }]}
      />
      <section className="w-full flex flex-col lg:flex-row gap-x-4">
        <article className="w-full lg:w-2/3">
          <FormProvider {...form.provider}>
            <form onSubmit={form.submit} className="flex flex-col gap-y-2 pt-4">
              {steps.current === 1 && <PersonForm />}
              {steps.current === 2 && <AddressForm />}
            </form>
          </FormProvider>
          <div className="w-full flex justify-between py-4">
            {steps.current > 1 && (
              <button
                type="button"
                onClick={steps.prev}
                className="w-48 bg-gray-500 text-white p-2 rounded-md font-semibold"
              >
                Voltar
              </button>
            )}
            {steps.current < 2 ? (
              <button
                type="button"
                onClick={steps.next}
                className="w-48 bg-blue-500 text-white p-2 rounded-md font-semibold"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className="w-48 bg-blue-500 text-white p-2 rounded-md font-semibold"
              >
                Finalizar Pagamento
              </button>
            )}
          </div>
        </article>
        <aside className="w-full lg:w-1/3">
          <h2 className="text-lg font-bold">Itens no Carrinho</h2>
          <ul className="flex flex-col gap-y-2 pt-2">
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-700"
              >
                <div className="flex">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16"
                  />
                  <div>
                    <p className="font-semibold dark:text-white">{item.name}</p>
                    <p className="dark:text-gray-300">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() =>
                        cart.updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <TiArrowSortedUp size={24} />
                    </button>
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          cart.updateItemQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      <TiArrowSortedDown size={24} />
                    </button>
                  </div>
                  <p className="dark:text-gray-300 text-xl">{item.quantity}</p>
                </div>
                <button
                  onClick={() => cart.remove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-4 flex items-center"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}

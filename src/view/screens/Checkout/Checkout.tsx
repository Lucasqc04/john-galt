import { FormProvider } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './useCheckout';

export function Checkout() {
  const { form, paymentMethod, cart } = useCheckout();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col px-4 py-8">
      <header className="flex gap-x-4 items-center">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack size={28} />
        </button>
        <h1 className="text-4xl font-semibold">Checkout</h1>
      </header>
      <section className="w-full flex flex-col lg:flex-row gap-x-4">
        <article className="p-6 w-full lg:w-2/3">
          <FormProvider {...form.provider}>
            <form onSubmit={form.submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email do Pagador
                </label>
                <input
                  type="email"
                  {...form.register('payerEmail', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {form.errors.payerEmail && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Primeiro Nome
                </label>
                <input
                  type="text"
                  {...form.register('firstName', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {form.errors.firstName && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Sobrenome
                </label>
                <input
                  type="text"
                  {...form.register('lastName', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {form.errors.lastName && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Tipo de Identificação
                </label>
                <select
                  {...form.register('identification.type', { required: true })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="CPF">CPF</option>
                  <option value="CNPJ">CNPJ</option>
                </select>
                {form.errors.identification?.type && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Número de Identificação
                </label>
                <input
                  type="text"
                  {...form.register('identification.number', {
                    required: true,
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {form.errors.identification?.number && (
                  <span className="text-red-500 text-sm">
                    Este campo é obrigatório
                  </span>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Método de Pagamento
                </label>
                <select
                  value={paymentMethod.value}
                  onChange={(e) => paymentMethod.set(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="MP">Mercado Pago</option>
                  <option value="BTC">Bitcoin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código do Cupom
                </label>
                <input
                  type="text"
                  {...form.register('couponCode')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
                >
                  Finalizar Pagamento
                </button>
              </div>
            </form>
          </FormProvider>
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

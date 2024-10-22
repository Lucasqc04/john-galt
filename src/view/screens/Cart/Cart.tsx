import { FaTrash } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { LanguageTexts } from '../../../domain/locales/Language';
import { ROUTES } from '../../routes/Routes';
import { useCart } from './useCart';

export function Cart() {
  const { t, currentLang, cart, navigate } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <h1 className="text-4xl font-bold dark:text-white">
          {t(LanguageTexts.cart.emptyCart)}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[15%] md:pt-[10%] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-x-4 border-b pb-2">
          <button onClick={() => navigate(-1)}>
            <IoArrowBack size={24} />
          </button>
          <h2 className="text-3xl font-bold dark:text-white">
            {t(LanguageTexts.cart.title)}
          </h2>
        </div>
        <div className="w-full pt-4 flex flex-col gap-y-6">
          <p className="font-semibold">
            Você tem {cart.items.length} itens no carrinho
          </p>
          <ul>
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
                      {t(LanguageTexts.cart.price)}: ${item.price.toFixed(2)}
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
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <button
              onClick={cart.clear}
              className="bg-[#F6911D] text-white px-4 py-2 rounded"
            >
              {t(LanguageTexts.cart.clearCart)}
            </button>
            <Link
              to={ROUTES.cart.checkout.call(currentLang)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {t(LanguageTexts.cart.checkout)}
            </Link>
          </div>
          <div className="font-bold text-lg dark:text-white">
            {t('cart.total')}: ${cart.total.toFixed(2)}{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

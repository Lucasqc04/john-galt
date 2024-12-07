import classNames from 'classnames';
import { t } from 'i18next';
import { Loader } from '../../../components/Loader';
import { useCartContext } from '../../../context/CartContext';
import { useShippingForm } from './useShippingForm';

export function ShippingForm() {
  const { items } = useCartContext();
  const { loading, shipping, shippingOptions } = useShippingForm();

  if (!shipping) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full flex flex-col justify-center items-center gap-y-6">
        {shipping.map((option) => {
          const foundProduct = items.find((produto) => produto.id !== '1');

          const deliveryTime = foundProduct
            ? option.deliveryTime + 30
            : option.deliveryTime;

          return (
            <button
              key={option.id}
              type="button"
              className={classNames(
                'w-full flex items-center justify-around rounded-md border border-solid border-gray-400 px-4 py-2',
                'transition-colors duration-300 ease-in-out hover:bg-orange-500 dark:bg-gray-100 dark:border-black',
                shippingOptions.value &&
                  option.id === shippingOptions.value.id &&
                  'bg-orange-primary dark:bg-orange-primary dark:hover:bg-orange-600',
                'md:w-3/4',
                'lg:w-full',
              )}
              onClick={() => shippingOptions.set(option)}
            >
              <img
                src={option.company.picture}
                alt={option.company.name}
                className="w-28 h-12"
              />
              <div className="w-full flex flex-col items-center justify-center text-left">
                <h4 className="text-xl uppercase font-bold">{option.name}</h4>
                <h5 className="text-base font-semibold">
                  R${' '}
                  {parseFloat(option.price).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h5>
                <span className="text-base font-semibold">
                  {deliveryTime} {t('checkout.days')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

import classNames from 'classnames';
import { t } from 'i18next';
import { Loader } from '../../../components/Loader';
import { useShippingForm } from './useShippingForm';

export function ShippingForm() {
  const { loading, shipping, shippingOptions } = useShippingForm();

  if (!shipping) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <div className="w-full flex flex-col justify-center items-center gap-y-6">
        {shipping.map((option) => (
          <button
            key={option.id}
            type="button"
            className={classNames(
              'w-full flex items-center justify-around rounded-md border border-solid border-gray-400 px-4 py-2',
              'transition-colors duration-300 ease-in-out hover:bg-gray-200',
              shippingOptions.value &&
                option.id === shippingOptions.value.id &&
                'bg-gray-300',
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
                {option.deliveryTime} {t('checkout.days')}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

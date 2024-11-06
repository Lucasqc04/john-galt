import Amex from '../../../assets/images/logocard/amex-logo.svg';
import Elo from '../../../assets/images/logocard/elo-logo.png';
import Hipercard from '../../../assets/images/logocard/hipercard-logo.png';
import MasterCard from '../../../assets/images/logocard/mastercard-logo.png';
import Visa from '../../../assets/images/logocard/visa-logo.png';
import { Loader } from '../../../components/Loader';
import { usePaymentForm } from './usePaymentForm';

export function PaymentForm() {
  const {
    t,
    brand,
    method,
    form,
    loading,
    installment,
    handleExpiryDateChange,
  } = usePaymentForm();

  return (
    <>
      {loading && <Loader />}
      <div className="py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Escolha a Forma de Pagamento
        </h3>
        <div className="flex flex-col gap-y-4 pt-2">
          {[
            {
              label: 'Cartão de Crédito',
              value: 'EFI',
            },
            { label: 'Pix', value: 'MP' },
            {
              label: 'Conta Mercado Pago',
              value: 'MP',
            },
            { label: 'Outros', value: 'MP' },
          ].map((method, idx) => (
            <label
              key={idx}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <input
                type="radio"
                {...form.register('method')}
                value={method.value}
                className="hidden peer"
              />
              <span className="w-5 h-5 rounded-full border border-gray-400 dark:border-gray-600 flex items-center justify-center peer-checked:bg-blue-500 dark:peer-checked:bg-blue-400">
                <span className="w-3 h-3 rounded-full bg-transparent peer-checked:bg-white"></span>
              </span>
              <span className="text-gray-900 dark:text-white">
                {method.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      {method === 'EFI' && (
        <div className="w-full grid grid-cols-12 gap-x-4 gap-y-2">
          <div className="col-span-12">
            <label className="block text-gray-400 font-semibold mb-1">
              {t('cardNamePlaceholder')}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...form.register('cardName', { required: true })}
            />
            {form.errors.cardName && (
              <span className="text-red-500 text-xs">{t('requiredField')}</span>
            )}
          </div>

          <div className="col-span-12 flex items-end gap-x-2">
            <div className="flex-grow">
              <label className="block text-gray-400 font-semibold mb-1">
                {t('cardNumberPlaceholder')}
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...form.register('cardNumber', {
                  required: true,
                  maxLength: 16,
                })}
              />
              {form.errors.cardNumber && (
                <span className="text-red-500 text-xs">
                  {t('requiredField')}
                </span>
              )}
            </div>
            <div className="w-14 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded">
              {brand === 'visa' && (
                <img src={Visa} alt="Visa Logo" className="h-7" />
              )}
              {brand === 'mastercard' && (
                <img src={MasterCard} alt="MasterCard Logo" className="h-7" />
              )}
              {brand === 'amex' && (
                <img src={Amex} alt="Amex Logo" className="h-7" />
              )}
              {brand === 'elo' && (
                <img src={Elo} alt="Elo Logo" className="h-7" />
              )}
              {brand === 'hipercard' && (
                <img src={Hipercard} alt="Hipercard Logo" className="h-7" />
              )}
            </div>
          </div>

          <div className="col-span-6">
            <label className="block text-gray-400 font-semibold mb-1">
              {t('expiryDatePlaceholder')}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...form.register('expiryDate', { required: true, maxLength: 5 })}
              onChange={handleExpiryDateChange}
            />
            {form.errors.expiryDate && (
              <span className="text-red-500 text-xs">Campo Obrigatório</span>
            )}
          </div>

          <div className="col-span-6">
            <label className="block text-gray-400 font-semibold mb-1">
              {t('cvvPlaceholder')}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              {...form.register('cvv', { required: true, maxLength: 3 })}
            />
            {form.errors.cvv && (
              <span className="text-red-500 text-xs">Campo Obrigatório</span>
            )}
          </div>

          {installment && (
            <div className="col-span-12">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Parcelamento
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...form.register('selectInstallments')}
              >
                {installment.map((option, idx) => (
                  <option value={option.installment} selected={idx === 0}>
                    {option.installment}x {option.currency}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </>
  );
}

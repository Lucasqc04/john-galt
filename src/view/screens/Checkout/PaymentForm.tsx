import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Brand,
  GetCheckout,
  Installment,
} from '../../../domain/entities/payment.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { Loader } from '../../components/Loader';

export function PaymentForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<GetCheckout>();
  const [brand, setBrand] = useState<Brand>('undefined');
  const [installment, setInstallment] = useState<Installment[]>();
  const method = watch('method');
  const total = watch('total');
  const cvv = watch('cvv');

  const HandleWithInstallments = useCallback(async () => {
    setLoading(true);
    try {
      const { result } = await UseCases.payment.listInstallments.execute({
        brand,
        total: total * 100,
      });

      if (result.type === 'ERROR') {
        return;
      }

      setInstallment(result.data);
    } finally {
      setLoading(false);
    }
  }, [total, brand]);

  useEffect(() => {
    if (cvv && cvv.length === 3) {
      HandleWithInstallments();
    }
  }, [cvv, HandleWithInstallments]);

  const identifyBrand = useCallback(
    async (cardNumber: string) => {
      const { result } = await UseCases.payment.indentifyBrand.execute({
        cardNumber,
      });

      if (result.type === 'ERROR') {
        alert('ERRO AO INDENTIFICAR BANDEIRA');
        return;
      }

      setBrand(result.data);
      setValue('brand', brand);
    },
    [brand, setValue],
  );

  const cardNumber = watch('cardNumber');
  useEffect(() => {
    if (cardNumber && cardNumber.length === 16) {
      identifyBrand(cardNumber);
    } else {
      setBrand('unsupported');
    }
  }, [cardNumber, identifyBrand, installment]);

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
            { label: 'Outros', value: 'MP' },
          ].map((method, idx) => (
            <label
              key={idx}
              className="flex items-center gap-x-3 cursor-pointer"
            >
              <input
                type="radio"
                {...register('method')}
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
              {...register('cardName', { required: true })}
            />
            {errors.cardName && (
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
                {...register('cardNumber', { required: true, maxLength: 16 })}
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-xs">
                  {t('requiredField')}
                </span>
              )}
            </div>
            <div className="w-14 h-10 flex items-center justify-center bg-gray-700 border border-gray-600 rounded">
              {brand === 'visa' && (
                <img
                  src="src/view/assets/images/logocard/visa-logo.png"
                  alt={t('visa')}
                  className="h-7"
                />
              )}
              {brand === 'mastercard' && (
                <img
                  src="src/view/assets/images/logocard/mastercard-logo.png"
                  alt={t('mastercard')}
                  className="h-7"
                />
              )}
              {brand === 'unsupported' && (
                <svg
                  className="text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ff9800"
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                  ></path>
                  <path
                    fill="#d50000"
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                  ></path>
                  <path
                    fill="#ff3d00"
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                  ></path>
                </svg>
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
              {...register('expiryDate', { required: true, maxLength: 5 })}
            />
            {errors.expiryDate && (
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
              {...register('cvv', { required: true, maxLength: 3 })}
            />
            {errors.cvv && (
              <span className="text-red-500 text-xs">Campo Obrigatório</span>
            )}
          </div>
          {installment && installment.length > 0 && (
            <div className="col-span-12">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Parcelamento
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('installments')}
              >
                {installment.map((option, idx) => (
                  <option value={option.value} selected={idx === 0}>
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

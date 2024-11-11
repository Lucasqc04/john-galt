import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetCheckout } from '../../../domain/entities/payment.entity';
import { useCheckout } from './useCheckout';

export function AddressForm() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<GetCheckout>();
  const { loading } = useCheckout();
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.zipCode')}
        </label>
        <input
          type="text"
          {...register('address.zipCode', { required: true })}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const sanitizedValue = e.target.value
              .replace(/\D/g, '')
              .slice(0, 8);
            setValue('address.zipCode', sanitizedValue);
          }}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.address?.zipCode && (
          <span className="text-red-500 text-sm">
            {t('addressForm.requiredField')}
          </span>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.street')}
        </label>
        <input
          type="text"
          {...register('address.street', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.street && (
          <span className="text-red-500 text-sm">
            {t('addressForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.number')}
        </label>
        <input
          type="text"
          {...register('address.number', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.number && (
          <span className="text-red-500 text-sm">
            {t('addressForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.complement')}
        </label>
        <input
          type="text"
          {...register('address.complement')}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.city')}
        </label>
        <input
          type="text"
          {...register('address.city', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.city && (
          <span className="text-red-500 text-sm">
            {t('addressForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('addressForm.neighborhood')}
        </label>
        <input
          type="text"
          {...register('address.neighborhood', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.neighborhood && (
          <span className="text-red-500 text-sm">
            {t('addressForm.requiredField')}
          </span>
        )}
      </div>

      <input type="hidden" {...register('address.uf')} />
    </div>
  );
}

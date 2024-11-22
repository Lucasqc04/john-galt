import { Loader } from '../../../components/Loader';
import { useAddressForm } from './useAddressForm';

export function AddressForm() {
  const { t, form, loading, zipCodeMask } = useAddressForm();

  return (
    <>
      {loading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('addressForm.zipCode')}
          </label>
          <input
            type="text"
            {...form.register('address.zipCode', { required: true })}
            onChange={zipCodeMask}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {form.formState.errors.address?.zipCode && (
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
            {...form.register('address.street', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />
          {form.formState.errors.address?.street && (
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
            {...form.register('address.number', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />
          {form.formState.errors.address?.number && (
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
            {...form.register('address.complement')}
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
            {...form.register('address.city', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />
          {form.formState.errors.address?.city && (
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
            {...form.register('address.neighborhood', { required: true })}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />
          {form.formState.errors.address?.neighborhood && (
            <span className="text-red-500 text-sm">
              {t('addressForm.requiredField')}
            </span>
          )}
        </div>

        <input type="hidden" {...form.register('address.uf')} />
      </div>
    </>
  );
}

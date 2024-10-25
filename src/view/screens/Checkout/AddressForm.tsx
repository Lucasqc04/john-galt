import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../domain/entities/payment.entity';
import { useCheckout } from './useCheckout';

export function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<GetCheckout>();
  const { loading } = useCheckout();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          CEP
        </label>
        <input
          type="text"
          {...register('address.zipCode', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.address?.zipCode && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Logradouro
        </label>
        <input
          type="text"
          {...register('address.street', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.street && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Número
        </label>
        <input
          type="text"
          {...register('address.number', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.number && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Complemento
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
          Cidade
        </label>
        <input
          type="text"
          {...register('address.city', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.city && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Estado
        </label>
        <input
          type="text"
          {...register('address.state', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={loading}
        />
        {errors.address?.state && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>
    </div>
  );
}

import { useFormContext } from 'react-hook-form';
import { CheckoutForm } from './useCheckout';

export function PersonForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          {...register('payerEmail', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.payerEmail && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome
        </label>
        <input
          type="text"
          {...register('firstName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sobrenome
        </label>
        <input
          type="text"
          {...register('lastName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Documento
        </label>
        <select
          {...register('identification.type', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </select>
        {errors.identification?.type && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Número de Identificação
        </label>
        <input
          type="text"
          {...register('identification.number', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.identification?.number && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>
    </>
  );
}

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
        <label className="block text-sm font-medium text-gray-700">
          Email do Pagador
        </label>
        <input
          type="email"
          {...register('payerEmail', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.payerEmail && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Primeiro Nome
        </label>
        <input
          type="text"
          {...register('firstName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Sobrenome</label>
        <input
          type="text"
          {...register('lastName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Tipo de Identificação
        </label>
        <select
          {...register('identification.type', {
            required: true,
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </select>
        {errors.identification?.type && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Número de Identificação
        </label>
        <input
          type="text"
          {...register('identification.number', {
            required: true,
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.identification?.number && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Código do Cupom
        </label>
        <input
          type="text"
          {...register('couponCode')}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </>
  );
}

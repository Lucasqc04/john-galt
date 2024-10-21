import { useFormContext } from 'react-hook-form';

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type CheckoutForm = {
  address: Address;
};

export function AddressForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutForm>();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Endereço
        </label>
        <input
          type="text"
          {...register('address.street', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.address?.street && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cidade
        </label>
        <input
          type="text"
          {...register('address.city', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.address?.city && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <input
          type="text"
          {...register('address.state', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.address?.state && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          {...register('address.zipCode', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.address?.zipCode && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>
    </div>
  );
}

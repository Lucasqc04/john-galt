import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../domain/entities/payment.entity';

export function PersonForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<GetCheckout>();

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    e.target.value = value;
  };

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
          Data de Nascimento
        </label>
        <input
          type="text"
          {...register('birthday', { required: true })}
          onChange={handleBirthdayChange}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.birthday && (
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

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Telefone
        </label>
        <div className="flex gap-x-4">
          <input
            type="text"
            {...register('phone.areaCode', { required: true })}
            placeholder="DDD"
            maxLength={2}
            className="w-1/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            {...register('phone.number', { required: true })}
            placeholder="Número"
            className="w-3/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, '');
            }}
          />
        </div>
        {errors.phone?.areaCode && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
        {errors.phone?.number && (
          <span className="text-red-500 text-sm">Este campo é obrigatório</span>
        )}
      </div>
    </>
  );
}

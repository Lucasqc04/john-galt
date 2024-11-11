import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetCheckout } from '../../../domain/entities/payment.entity';

export function PersonForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<GetCheckout>();
  const { t } = useTranslation();

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

  const phoneNumber = '5511919050416';
  const message = t('personForm.internationalSupportMessage');
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.email')}
        </label>
        <input
          type="email"
          {...register('payerEmail', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.payerEmail && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.firstName')}
        </label>
        <input
          type="text"
          {...register('firstName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.firstName && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.lastName')}
        </label>
        <input
          type="text"
          {...register('lastName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.lastName && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.birthday')}
        </label>
        <input
          type="text"
          {...register('birthday', { required: true })}
          onChange={handleBirthdayChange}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.birthday && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.document')}
        </label>
        <select
          {...register('identification.type', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="CPF">{t('personForm.documentOptions.CPF')}</option>
          <option value="CNPJ">{t('personForm.documentOptions.CNPJ')}</option>
        </select>
        {errors.identification?.type && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.idNumber')}
        </label>
        <input
          type="text"
          {...register('identification.number', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.identification?.number && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.phone')}
        </label>
        <div className="flex gap-x-4">
          <input
            type="text"
            {...register('phone.areaCode', { required: true })}
            placeholder={t('personForm.areaCode')}
            maxLength={2}
            className="w-1/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            {...register('phone.number', { required: true })}
            placeholder={t('personForm.number')}
            className="w-3/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, '');
            }}
          />
        </div>
        {errors.phone?.areaCode && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
        {errors.phone?.number && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="mt-6">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-2 py-1 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          {t('personForm.internationalSupport')}
        </a>
      </div>
    </>
  );
}

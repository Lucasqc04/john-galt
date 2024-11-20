import { usePersonForm } from './usePersonForm';

export function PersonForm() {
  const {
    t,
    form,
    whatsappLink,
    birthdayMask: handleBirthdayChange,
  } = usePersonForm();

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.firstName')}
        </label>
        <input
          type="text"
          {...form.register('firstName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {form.formState.errors.firstName && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>
      <div className="col-span-7">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.lastName')}
        </label>
        <input
          type="text"
          {...form.register('lastName', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {form.formState.errors.lastName && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>
      <div className="col-span-12">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.email')}
        </label>
        <input
          type="email"
          {...form.register('payerEmail', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {form.formState.errors.payerEmail && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="col-span-12">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.phone')}
        </label>
        <div className="flex gap-x-2">
          <input
            type="text"
            {...form.register('phone.areaCode', { required: true })}
            placeholder={t('personForm.areaCode')}
            maxLength={2}
            className="w-1/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            {...form.register('phone.number', { required: true })}
            placeholder={t('personForm.number')}
            className="w-3/4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.replace(/\D/g, '');
            }}
          />
        </div>
        {form.formState.errors.phone?.areaCode && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
        {form.formState.errors.phone?.number && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="col-span-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.document')}
        </label>
        <select
          {...form.register('identification.type', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="CPF">{t('personForm.documentOptions.CPF')}</option>
          <option value="CNPJ">{t('personForm.documentOptions.CNPJ')}</option>
        </select>
        {form.formState.errors.identification?.type && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="col-span-8">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.idNumber')}
        </label>
        <input
          type="text"
          {...form.register('identification.number', { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {form.formState.errors.identification?.number && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="col-span-12">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('personForm.birthday')}
        </label>
        <input
          type="text"
          {...form.register('birthday', { required: true })}
          onChange={handleBirthdayChange}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {form.formState.errors.birthday && (
          <span className="text-red-500 text-sm">
            {t('personForm.requiredField')}
          </span>
        )}
      </div>

      <div className="col-span-12">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-2 py-1 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-300 text-center"
        >
          {t('personForm.internationalSupport')}
        </a>
      </div>
    </div>
  );
}

import { FormProvider } from 'react-hook-form';
import { Loader } from '../../../components/Loader';
import { useNewsletter } from './useNewsletter';

export function Newsletter() {
  const { t, form, loading, register, onsubmit } = useNewsletter();

  if (loading) <Loader />;

  return (
    <div className="mx-auto bg-white dark:bg-gray-600 w-[80%] p-6 rounded-lg shadow-2xl">
      <div>
        <h3 className="dark:text-white text-2xl md:text-3xl font-bold text-center">
          {t('NewsletterTitle')}
        </h3>
        <p className="text-xl mt-6 dark:text-white text-center">
          {t('NewsletterDescription')}
        </p>
        <FormProvider {...form}>
          <form
            onSubmit={onsubmit}
            className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12"
          >
            <input
              type="email"
              placeholder={t('NewsletterEmailPlaceholder')}
              className="text-gray-300 w-full outline-none bg-transparent text-sm px-4 py-3"
              {...register('email')}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white text-sm rounded-full px-6 py-3"
            >
              {t('NewsletterSubmitButton')}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { FiLock, FiSettings } from 'react-icons/fi';

export function Newsletter() {
  const { t } = useTranslation();

  return (
    <div className="dark:bg-gray-800 font-[sans-serif] p-6 rounded-[12px] w-4/5 mt-10 mb-10 mx-auto shadow-lg">
      <div className="grid lg:grid-cols-2 items-center gap-16 max-w-7xl mx-auto min-h-[350px]">
        <div>
          <h3 className="dark:text-white-white text-4xl font-bold">
            {t('NewsletterTitle')}
          </h3>
          <p className="text-base mt-6 dark:text-white">
            {t('NewsletterDescription')}
          </p>
          <div className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12">
            <input
              type="email"
              placeholder={t('NewsletterEmailPlaceholder')}
              className="dark:text-white w-full outline-none bg-transparent text-sm px-4 py-3"
            />
            <button
              type="button"
              className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white-white text-sm rounded-full px-6 py-3"
            >
              {t('NewsletterSubmitButton')}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <FiSettings className="w-12 h-12 mb-6 inline-block border border-gray-500 p-3 rounded-md" />
            <h3 className="dark:text-white-white text-xl font-semibold mb-3">
              {t('CustomizationTitle')}
            </h3>
            <p className="dark:text-white text-sm">
              {t('CustomizationDescription')}
            </p>
          </div>
          <div>
            <FiLock className="w-12 h-12 mb-6 inline-block border border-gray-500 p-3 rounded-md" />
            <h3 className="dark:text-white-white text-xl font-semibold mb-3">
              {t('SecurityTitle')}
            </h3>
            <p className="dark:text-white text-sm">
              {t('SecurityDescription')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

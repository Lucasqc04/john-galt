import { useTranslation } from 'react-i18next';
import bitkit from '../../assets/bitcoin-btc-logo.svg';

export function Services() {
  const { t } = useTranslation();

  return (
    <div className="dark:bg-white dark:text-white grid p-6 md:p-12">
      <div className="mx-auto dark:bg-gray-800 mt-10 mb-10">
        <h1 className="dark:text-white text-3xl md:text-4xl font-bold text-center">
          {t('ServiceTitle')}
        </h1>
      </div>
      <div className="grid gap-6 md:gap-12 md:grid-cols-2">
        <div className="mx-auto bg-white dark:bg-gray-600 w-[80%] p-6 rounded-lg shadow-2xl">
          <h1 className="dark:text-white text-2xl md:text-3xl font-bold">
            {t('ServiceDescription')}
          </h1>
          <img
            className="mt-6 rounded-lg transition-transform duration-800 hover:translate-y-[-10px] active:scale-110 w-1/3 mx-auto"
            src={bitkit}
            alt="bitkit"
          />
          <p className="font-medium mt-3">{t('CustomizationDescription')}</p>
          <button className="font-bold text-white p-3 rounded-md dark:bg-orange-500 bg-orange-500 text-center w-full sm:w-1/2 mt-10 cursor-pointer hover:opacity-40 active:scale-110 transition-transform duration-100">
            {t('ServiceGetInTouchButton')}
          </button>
        </div>

        <div className="mx-auto bg-white dark:bg-gray-600 w-[80%] p-6 rounded-lg shadow-2xl">
          <div>
            <h3 className="dark:text-white text-2xl md:text-3xl font-bold text-center">
              {t('NewsletterTitle')}
            </h3>
            <p className="text-xl mt-6 dark:text-white text-center">
              {t('NewsletterDescription')}
            </p>
            <div className="bg-transparent border border-gray-500 flex p-1 rounded-full mt-12">
              <input
                type="email"
                placeholder={t('NewsletterEmailPlaceholder')}
                className="text-gray-300 w-full outline-none bg-transparent text-sm px-4 py-3"
              />
              <button
                type="button"
                className="bg-orange-500 text-white hover:bg-orange-300 transition-all dark:text-white text-sm rounded-full px-6 py-3"
              >
                {t('NewsletterSubmitButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

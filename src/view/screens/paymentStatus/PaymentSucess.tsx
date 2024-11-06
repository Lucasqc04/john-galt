import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function PaymentSuccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary-dark flex flex-col justify-center items-center px-4 text-center">
      <div className="bg-success rounded-full p-8 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-success dark:text-white mb-6">
        {t('paymentSuccess.title')}
      </h1>
      <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300 max-w-xl">
        {t('paymentSuccess.description')}
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-success text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        {t('paymentSuccess.redirectButton')}
      </button>
    </div>
  );
}

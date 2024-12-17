import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function PaymentAlfredSuccess() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const navigate = useNavigate();
  const handleOnLink = (path: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-primary-light dark:bg-primary-dark flex flex-col justify-center items-center px-4 text-center">
      <div className="flex justify-center">
        <LanguageSwitcher className="transform scale-110" />
      </div>
      <div className="bg-success rounded-full p-8 mb-8 mt-5">
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
        {t('paymentSuccess.description')} A transação pode variar entre 30
        minutos a 24 horas
      </p>
      <button
        onClick={() =>
          window.open(
            'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0APreciso%20de%20ajuda%20sobre%20os%20produtos%20da%20DIY%20LAB...',

            '_blank',
          )
        }
        className="bg-success text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        <span>WhatsApp</span>
      </button>
      <button
        onClick={() => handleOnLink(ROUTES.buyBitcoin.call(currentLang))}
        className="bg-success m-5 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        {t('paymentSuccess.redirectButton')}
      </button>
    </div>
  );
}

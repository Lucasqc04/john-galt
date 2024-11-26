import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function PaymentFailure() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const whatsappUrl = localStorage.getItem('whatsappUrl');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (whatsappUrl) {
            window.location.href = whatsappUrl;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-y-6 bg-primary-light dark:bg-primary-dark pt-[15%] md:pt-[10%] px-4 text-center">
      <div className="flex justify-center">
        <LanguageSwitcher className="transform scale-110" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-orange-primary dark:text-white">
        {t('paymentFailure.title')}
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
        {t('paymentFailure.description', { countdown })}
      </p>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          className="inline-block bg-orange-primary text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('paymentFailure.redirectButton')}
        </a>
      )}
      <Link
        to={ROUTES.cart.checkout.call(currentLang)}
        className="bg-orange-primary text-white font-bold px-4 py-2 rounded-sm w-64"
      >
        VOLTAR PARA O CARRINHO
      </Link>
    </div>
  );
}

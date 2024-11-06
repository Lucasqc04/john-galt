import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';

export function PaymentFailure() {
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-[#F0F4F8] dark:bg-gray-900 pt-[15%] md:pt-[10%] px-4 text-center">
      <div className="flex justify-center mb-6">
        <LanguageSwitcher className="transform scale-110" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F6911D] dark:text-white">
        {t('paymentFailure.title')}
      </h1>
      <p className="text-lg md:text-xl mt-6 text-gray-700 dark:text-gray-300">
        {t('paymentFailure.description', { countdown })}
      </p>
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          className="mt-8 inline-block bg-[#F6911D] text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('paymentFailure.redirectButton')}
        </a>
      )}
    </div>
  );
}

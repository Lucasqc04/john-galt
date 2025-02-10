import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher/LanguageSwitcher';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function PaymentAlfredFailure() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();

  return (
    <div className="min-h-screen flex flex-col items-center gap-y-6 bg-primary-light dark:bg-primary-dark pt-[15%] md:pt-[10%] px-4 text-center">
      <div className="flex justify-center">
        <LanguageSwitcher LabelClassName="transform scale-110" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#F39200] dark:text-white">
        {t('paymentFailure.title')}
      </h1>
      <Link
        to={ROUTES.checkout.call(currentLang)}
        className="bg-[#F39200] text-white font-bold px-4 py-2 rounded-sm w-64"
      >
        {t('paymentFailure.returnToSite')}
      </Link>
      <button
        onClick={() =>
          window.open(
            'https://api.whatsapp.com/send?phone=+5511919050416&text=Ol%C3%A1,%20Tudo%20bem?%0A%0APreciso%20de%20ajuda%20sobre%20os%20produtos%20do%20ALFRED...',
            '_blank',
          )
        }
        className="bg-success text-white px-8 py-3 m-5 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        {t('paymentFailure.whatsapp')}
      </button>
    </div>
  );
}

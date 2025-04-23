import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useTranslation } from 'react-i18next';

export function Fees() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mx-auto p-6 pt-[10%] sm:pt-16 pb-16">
        <h1 className="text-2xl font-bold pb-6 text-white">
          {t('fees.title')}
        </h1>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.dailyLimit1')}
          </h2>
          <ul className="list-disc pl-5 text-white">
            <li>{t('fees.above1000')}</li>
          </ul>
        </section>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.dailyLimit2')}
          </h2>
          <p className="text-white">{t('fees.fixedRate')}</p>
        </section>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.couponsTitle')}
          </h2>
          <p className="text-white">{t('fees.coupons')}</p>
        </section>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.convertibilityRatesTile')}
          </h2>
          <p className="text-white">{t('fees.convertibilityRates')}</p>
        </section>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.reflectionTitle')}
          </h2>
          <p className="text-white">{t('fees.reflection1')}</p>
          <p className="text-white pt-4">{t('fees.reflection2')}</p>
          <p className="text-white pt-4">{t('fees.reflection3')}</p>
          <p className="text-white pt-4">{t('fees.reflection4')}</p>
        </section>

        <section className="pb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {t('fees.privacyTitle')}
          </h2>
          <p className="text-white">{t('fees.privacy1')}</p>
          <p className="text-white pt-4">{t('fees.privacy2')}</p>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
}

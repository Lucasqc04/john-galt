import { useTranslation } from 'react-i18next';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import WhatsAppButton from '../../components/buttonWhatsApp';
import HeaderAlfred from './HeaderAlfred';

export function Fees() {
  const { t } = useTranslation();

  return (
    <>
      <BackgroundAnimatedProduct />
      <HeaderAlfred />
      <div className="container mx-auto p-6 mt-[20%] sm:mt-[10%] mb-16">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">
          {t('fees.title')}
        </h1>

        <section className="mb-8">
          <ul className="list-disc pl-5 text-black dark:text-white">
            <li>
              <strong>5%:</strong> {t('fees.above1000')}
            </li>
            <li>
              <strong>10%:</strong> {t('fees.below1000')}
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            {t('fees.reflectionTitle')}
          </h2>
          <p className="text-black dark:text-white">{t('fees.reflection1')}</p>
          <p className="text-black dark:text-white mt-4">
            {t('fees.reflection2')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('fees.reflection3')}
          </p>
          <p className="text-black dark:text-white mt-4">
            {t('fees.reflection4')}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            {t('fees.privacyTitle')}
          </h2>
          <p className="text-black dark:text-white">{t('fees.privacy1')}</p>
          <p className="text-black dark:text-white mt-4">
            {t('fees.privacy2')}
            <strong>700 BRL</strong>.
          </p>
        </section>
      </div>
      <WhatsAppButton />
    </>
  );
}

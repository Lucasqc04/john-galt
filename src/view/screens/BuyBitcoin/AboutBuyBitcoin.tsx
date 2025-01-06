import { useTranslation } from 'react-i18next';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import WhatsAppButton from '../../components/buttonWhatsApp';
import HeaderAlfred from './HeaderAlfred';

export function AboutBuyBitcoin() {
  const { t } = useTranslation();

  // Tipagem explícita para os parágrafos
  const paragraphs: string[] = t('about.paragraphs', {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <BackgroundAnimatedProduct />
      <HeaderAlfred />
      <div className="container mx-auto p-6 mt-[20%] sm:mt-[10%]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            {t('about.title')}
          </h1>
        </div>
        <div className="text-black dark:text-white space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 3 ? 'font-semibold' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
        <WhatsAppButton />
      </div>
    </>
  );
}

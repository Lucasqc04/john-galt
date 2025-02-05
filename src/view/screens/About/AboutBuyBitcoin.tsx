import WhatsAppButton from '@/view/components/buttonWhatsApp';
import { useTranslation } from 'react-i18next';

export function AboutBuyBitcoin() {
  const { t } = useTranslation();

  const paragraphs: string[] = t('about.paragraphs', {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <div className="container mx-auto p-6 pt-[10%] sm:pt-16 pb-16 px-8">
        <div className="pb-4 text-center">
          <h1 className="text-3xl font-bold text-white">{t('about.title')}</h1>
        </div>
        <div className="text-white text-justify ">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={`${index === 3 && 'font-semibold'} py-4`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <WhatsAppButton />
    </>
  );
}

import { useTranslation } from 'react-i18next';
import { LanguageTexts } from '../../domain/locales/Language';
import { BackgroundAnimated } from '../components/BackgroundAnimated';

export function PrivacyPolicy() {
  const { t } = useTranslation();

  const text = t(LanguageTexts.privacyPolicy.text, {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <BackgroundAnimated />
      <section className="px-8 md:px-16 min-h-screen pt-36">
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center justify-center px-12 md:px-0">
          <h3 className="text-center font-bold text-lg md:text-3xl">
            {t(LanguageTexts.privacyPolicy.title)}
          </h3>
        </article>
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center md:items-start justify-center py-6 md:px-4">
          {text.map((paragraph, idx) => (
            <p key={idx} className="text-justify text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </article>
      </section>
    </>
  );
}

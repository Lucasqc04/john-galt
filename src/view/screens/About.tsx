import { useTranslation } from 'react-i18next';
import { LanguageTexts } from '../../domain/locales/Language';
import { BackgroundAnimated } from '../components/BackgroundAnimated';

export function About() {
  const { t } = useTranslation();

  const manifest = t(LanguageTexts.about.manifest, {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <BackgroundAnimated />
      <section className="grid grid-cols-1 md:grid-cols-12 px-8 md:px-16 min-h-screen pt-36 md:pt-0">
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center justify-center px-12 md:px-0">
          <h3 className="text-center font-bold text-lg md:text-3xl">
            {t(LanguageTexts.about.title)}
          </h3>
          <span className="text-center font-semibold text-base md:text-2xl">
            {t(LanguageTexts.about.subtitle)}
          </span>
        </article>
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center md:items-start justify-center py-6 md:px-4">
          {manifest.map((paragraph, idx) => (
            <p key={idx} className="text-justify text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </article>
      </section>
    </>
  );
}

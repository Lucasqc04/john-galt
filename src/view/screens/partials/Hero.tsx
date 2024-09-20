import { useTranslation } from 'react-i18next';
import { LanguageTexts } from '../../../domain/locales/Language';
import { BackgroundAnimated } from '../../components/BackgroundAnimated';

function styleFirstWord(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 0) {
    const firstWord = words.shift();
    const remainingText = words.join(' ');

    return (
      <span>
        <span className="text-orange-500">{firstWord}</span> {remainingText}
      </span>
    );
  }

  return text;
}

export function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <BackgroundAnimated />
      <section className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-8 h-screen">
        <article className=" h-full col-span-12 md:col-span-6 flex flex-col gap-y-4 items-center justify-center">
          <h1 className="max-w-2xl text-4xl md:text-6xl text-center font-bold whitespace-pre-wrap break-words animate-fade-right animate-once animate-duration-500 animate-delay-300">
            {styleFirstWord(t(LanguageTexts.HeroTitle))}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-center font-semibold animate-flip-up animate-once">
            {t(LanguageTexts.HeroDescription)}
          </p>
          <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-4">
            <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-sm transition-colors duration-300 hover:bg-orange-600 shadow-md">
              {t(LanguageTexts.HeroGetInTouchButton)}
            </button>
            <button className="w-full py-2 border border-solid border-orange-500 font-semibold rounded-sm transition-all duration-500 hover:bg-orange-500 hover:text-white shadow-md">
              {t(LanguageTexts.HeroLearnMoreButton)}
            </button>
          </div>
        </article>
        <article className="hidden md:block col-span-6"></article>
      </section>
    </>
  );
}

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import {
  AcceptedLanguages,
  LanguageTexts,
  useLanguage,
} from '../../../domain/locales/Language';
import HeroImage from '../../assets/images/hero-image.png';
import { BackgroundAnimated } from '../../components/BackgroundAnimated';
import { styleFirstWord } from '../../utils/StyleWord';

export function Hero() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const navigate = useNavigate();

  const handleButton = () => {
    navigate(`/${currentLang || AcceptedLanguages.pt}/produtos`);
  };
  const { currentLang } = useLanguage();

  return (
    <>
      <BackgroundAnimated />
      <section
        ref={ref}
        className="grid grid-cols-12 px-6 sm:px-4 md:px-8 h-screen"
      >
        <article className="h-full col-span-12 md:col-span-6 flex flex-col gap-y-4 justify-center items-center">
          <h1 className="max-w-2xl text-4xl md:text-6xl text-center font-bold whitespace-pre-wrap break-words animate-fade-right animate-once animate-duration-500 animate-delay-300">
            {styleFirstWord(t(LanguageTexts.hero.title))}
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-center font-semibold animate-flip-up animate-once">
            {t(LanguageTexts.hero.description)}
          </p>
          <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-4">
            <button
              onClick={handleButton}
              className="w-full py-2 bg-[#F6911D] text-white font-semibold rounded-sm transition-colors duration-300 hover:bg-orange-600 shadow-md"
            >
              {t(LanguageTexts.hero.buttons.products)}
            </button>
            <a
              href="#statistics"
              className="w-full py-2 text-center border border-solid border-[#F6911D] font-semibold rounded-sm transition-all duration-500 hover:bg-[#F6911D] hover:text-white shadow-md"
            >
              {t(LanguageTexts.hero.buttons.learnMore)}
            </a>
          </div>
        </article>
        <article className="hidden md:flex h-full col-span-12 md:col-span-6 flex-col gap-y-4 justify-center items-center">
          <img
            src={HeroImage}
            alt="NFT/Crypto Image"
            className={classNames(
              'w-full max-w-3xl',
              inView && 'opacity-100 animate-fade-right',
              !inView && 'opacity-0',
            )}
          />
        </article>
      </section>
    </>
  );
}

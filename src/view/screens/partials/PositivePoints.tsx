import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import PositivePoints1 from '../../assets/images/positive-points/positive-points-1.png';
import PositivePoints2 from '../../assets/images/positive-points/positive-points-2.png';
import PositivePoints3 from '../../assets/images/positive-points/positive-points-3.png';
import PositivePoints4 from '../../assets/images/positive-points/positive-points-4.png';

function styleThreeWordsAfterFourth(text: string): string | JSX.Element {
  const words = text.split(' ');

  if (words.length > 4) {
    const firstPart = words.slice(0, 4).join(' ');
    const styledWords = words.slice(4, 7).join(' ');
    const remainingPart = words.slice(7).join(' ');

    return (
      <>
        {firstPart}
        <span className="text-orange-500"> {styledWords} </span>
        {remainingPart}
      </>
    );
  }

  return text;
}

const positivePoints = [
  {
    image: PositivePoints1,
    titleKey: 'MentalityTitle',
  },
  {
    image: PositivePoints2,
    titleKey: 'ProtocolsTitle',
  },
  {
    image: PositivePoints3,
    titleKey: 'TransparencyTitle',
  },
  {
    image: PositivePoints4,
    titleKey: 'SecurityTitle',
  },
];

export function PositivePoints() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="w-full min-h-screen px-4 sm:px-8 bg-slate-800 dark:bg-primary-light flex flex-col justify-start items-center">
      <article
        ref={ref}
        className={classNames(
          'w-full flex items-start justify-center pt-16 transition-opacity duration-500',
        )}
      >
        <h2
          className={classNames(
            'text-4xl md:text-6xl text-center text-white dark:text-black font-bold whitespace-pre-wrap break-words max-w-4xl',
            inView && 'opacity-100 animate-fade-right',
            !inView && 'opacity-0',
          )}
        >
          {styleThreeWordsAfterFourth(t('PositivePointsTitle'))}
        </h2>
      </article>

      <article className="w-full  sm:pt-32 flex flex-wrap justify-around gap-y-4 md:p-14">
        {positivePoints.map((item, idx) => (
          <div
            key={idx}
            className={classNames(
              'bg-primary-light dark:border h-72 w-full sm:w-60 md:w-64 lg:w-72 rounded-md shadow-sm flex flex-col justify-center items-center m-4 p-4 md:p-6 lg:p-8',
              inView && 'opacity-100 animate-fade-right',
            )}
          >
            <img
              src={item.image}
              alt={t(item.titleKey)}
              className="w-2/3 sm:w-40 md:w-44 lg:w-2/3 max-h-48"
            />

            <span className="text-xl text-black font-bold">
              {t(item.titleKey)}
            </span>
          </div>
        ))}
      </article>
    </section>
  );
}

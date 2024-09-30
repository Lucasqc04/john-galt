import classNames from 'classnames';
import { t } from 'i18next'; // Importe a função t
import { useInView } from 'react-intersection-observer';
import brain from '../../assets/images/ai-generated-9026009.svg';
import chain from '../../assets/images/chain-5596267_1920.png';
import eye from '../../assets/images/eye-5336786_1920.png';
import security from '../../assets/images/security-4497950.png';

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
    image: security,
    size: { width: '200px', height: '200px' },
  },
  {
    image: brain,
    size: { width: '200px', height: '200px' },
  },
  {
    image: chain,
    size: { width: '200px', height: '200px' },
  },
  {
    image: eye,
    size: { width: '200px', height: '200px' },
  },
];

export function PositivePoints() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section className="w-full min-h-screen px-8 bg-slate-800 dark:bg-primary-light flex flex-col justify-start items-center">
      <article
        ref={ref}
        className={classNames(
          'w-full flex items-start justify-center pt-16 transition-opacity duration-500',
        )}
      >
        <h2
          className={classNames(
            'text-6xl max-md:text-4xl text-center text-white dark:text-black font-bold whitespace-pre-wrap break-words max-w-4xl max-md:max-w-6xl',
            inView && 'opacity-100 animate-fade-right',
            !inView && 'opacity-0',
          )}
        >
          {styleThreeWordsAfterFourth(t('PositivePointsTitle'))}{' '}
          {/* Usando t para traduzir o título */}
        </h2>
      </article>
      <article className="w-full pl-8 pt-32 flex flex-wrap justify-around">
        {positivePoints.map((item, idx) => (
          <div
            key={idx}
            className="bg-primary-light dark:border h-72 w-full sm:w-60 md:w-72 lg:w-72 rounded-md shadow-sm flex flex-col justify-center items-center m-4"
          >
            <img
              src={item.image}
              alt={t(`SecurityAndPrivacy`)}
              style={{ width: item.size.width, height: item.size.height }}
              className="object-contain mb-4"
            />
            <span className="text-xl text-black font-bold">
              {idx === 0 && t('SecurityAndPrivacy')}
              {idx === 1 && t('SovereignMindset')}
              {idx === 2 && t('OpenSourceProtocols')}
              {idx === 3 && t('TotalTransparency')}
            </span>
          </div>
        ))}
      </article>
    </section>
  );
}

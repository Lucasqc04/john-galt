import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

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

export function PositivePoints() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section className="grid grid-cols-12 px-8 h-screen w-full  bg-slate-800 dark:bg-primary-light">
      <article
        ref={ref}
        className={classNames(
          'col-span-full h-full flex flex-col gap-y-4 items-center justify-start pt-16 transition-opacity duration-500',
        )}
      >
        <h2
          className={classNames(
            'text-6xl max-md:text-4xl text-center text-white dark:text-black font-bold whitespace-pre-wrap break-words max-w-4xl max-md:max-w-6xl ',
            inView && 'opacity-100 animate-fade-right',
            !inView && 'opacity-0',
          )}
        >
          {styleThreeWordsAfterFourth(
            'Fique por dentro de tudo que precisa para investir com segurança',
          )}
        </h2>
      </article>
    </section>
  );
}

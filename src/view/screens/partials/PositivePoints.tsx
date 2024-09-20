import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

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
            'text-6xl text-center text-white dark:text-black font-bold whitespace-pre-wrap break-words max-w-4xl ',
            inView && 'opacity-100 animate-fade-right',
            !inView && 'opacity-0',
          )}
        >
          Fique por dentro de tudo que precisa para investir com segurança
        </h2>
      </article>
    </section>
  );
}

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';

export function BlogLinks() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-4 xl:px-0 py-12">
      <div
        ref={ref}
        className={classNames(
          'container transition-opacity duration-500',
          inView && 'opacity-100 animate-fade-right',
          !inView && 'opacity-0',
        )}
      >
        <h1 className="text-center text-3xl lg:text-5xl tracking-wider text-gray-900 dark:text-white">
          {t('BlogTitle')}
        </h1>
        <div className="pt-12 lg:pt-24">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            <div>
              <img
                className="w-full"
                src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(1).png"
                alt="computer"
              />
              <div className="py-4 px-8 w-full flex justify-between bg-orange-500">
                <p className="text-sm text-white font-semibold tracking-wide">
                  Bruce Wayne
                </p>
                <p className="text-sm text-white font-semibold tracking-wide">
                  13TH Oct, 2020
                </p>
              </div>
              <div className="bg-white dark:bg-slate-700 px-10 py-6 rounded-bl-3xl rounded-br-3xl">
                <h2 className="text-4xl text-gray-900 dark:text-white font-semibold tracking-wider">
                  {t('CardTitle1')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg lg:leading-8 tracking-wide mt-6 w-11/12">
                  {t('CardDescription1')}
                </p>
                <div className="w-full pt-4 justify-end flex items-center cursor-pointer gap-x-3 lg:gap-x-6">
                  <p className="text-base tracking-wide text-orange-500">
                    {t('ReadMore')}
                  </p>
                  <MdArrowForward size={28} />
                </div>
              </div>
            </div>
            <div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                <div>
                  <img
                    className="w-full"
                    src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png"
                    alt="games"
                  />
                  <div className="py-2 px-4 w-full flex justify-between bg-orange-500">
                    <p className="text-sm text-white font-semibold tracking-wide">
                      Bruce Wayne
                    </p>
                    <p className="text-sm text-white font-semibold tracking-wide">
                      13TH Oct, 2020
                    </p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                    <h2 className="text-lg text-gray-900 dark:text-white font-semibold tracking-wider">
                      {t('CardTitle2')}
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2">
                      {t('CardDescription2')}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-full"
                    src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(3).png"
                    alt="notes"
                  />
                  <div className="py-2 px-4 w-full flex justify-between bg-orange-500">
                    <p className="text-sm text-white font-semibold tracking-wide">
                      Bruce Wayne
                    </p>
                    <p className="text-sm text-white font-semibold tracking-wide">
                      13TH Oct, 2020
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-700 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                    <h2 className="text-lg text-gray-900 dark:text-white font-semibold tracking-wider">
                      {t('CardTitle3')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2">
                      {t('CardDescription3')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                <div>
                  <img
                    className="w-full"
                    src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(4).png"
                    alt="laptop"
                  />
                  <div className="py-2 px-4 w-full flex justify-between bg-orange-500">
                    <p className="text-sm text-white font-semibold tracking-wide">
                      Bruce Wayne
                    </p>
                    <p className="text-sm text-white font-semibold tracking-wide">
                      13TH Oct, 2020
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-700 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                    <h2 className="text-lg text-gray-900 dark:text-white font-semibold tracking-wider">
                      {t('CardTitle4')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2">
                      {t('CardDescription4')}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="w-full"
                    src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(5).png"
                    alt="worker"
                  />
                  <div className="py-2 px-4 w-full flex justify-between bg-orange-500">
                    <p className="text-sm text-white font-semibold tracking-wide">
                      Bruce Wayne
                    </p>
                    <p className="text-sm text-white font-semibold tracking-wide">
                      13TH Oct, 2020
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-700 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                    <h2 className="text-lg text-gray-900 dark:text-white font-semibold tracking-wider">
                      {t('CardTitle5')}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2">
                      {t('CardDescription5')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

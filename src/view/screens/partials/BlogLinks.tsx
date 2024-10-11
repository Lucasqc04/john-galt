import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { blogData } from '../../../blogContent/blogPosts';
import { AcceptedLanguages } from '../../../domain/locales/Language';
import { ROUTES } from '../../routes/Routes';

export function BlogLinks() {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  let currentLang = i18n.language.split('-')[0] as AcceptedLanguages;
  const supportedLanguages = [
    AcceptedLanguages.pt,
    AcceptedLanguages.en,
    AcceptedLanguages.es,
  ];

  if (!supportedLanguages.includes(currentLang)) {
    currentLang = AcceptedLanguages.en;
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-4 xl:px-0 py-8">
      <div
        ref={ref}
        className={classNames(
          'transition-opacity duration-500',
          inView && 'opacity-100 animate-fade-right',
          !inView && 'opacity-0',
        )}
      >
        <h1 className="text-center text-2xl lg:text-6xl font-bold tracking-wider text-gray-900 dark:text-white">
          <span className="text-[#F6911D] text-5xl lg:text-6xl font-bold">
            BLOG
          </span>
          <span className="ml-2">DIYLAB</span>
        </h1>
        <div className="pt-8 lg:pt-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(blogData).map((postId) => {
                const post = blogData[postId];
                const translation = post.translations[currentLang];

                if (!translation) {
                  console.error(
                    `No translation found for language: ${currentLang}`,
                  );
                  return null;
                }

                return (
                  <Link
                    key={postId}
                    to={ROUTES.blog.call(postId)}
                    className="bg-white dark:bg-slate-700 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-95 md:scale-90"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={post.image}
                      alt={translation.title}
                    />
                    <div className="py-2 px-4 w-full flex justify-between bg-[#F6911D]">
                      <p className="text-sm text-white font-semibold tracking-wide">
                        {translation.author || 'Autor Desconhecido'}
                      </p>
                      <p className="text-sm text-white font-semibold tracking-wide">
                        {translation.date || 'Data Desconhecida'}
                      </p>
                    </div>
                    <div className="px-4 py-4 md:p-3 lg:p-4">
                      <h2 className="text-2xl text-gray-900 dark:text-white font-semibold tracking-wider">
                        {t(translation.title)}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base tracking-wide mt-4">
                        {t(translation.subtitle)}
                      </p>
                      <div className="pt-2 flex items-center cursor-pointer gap-x-3">
                        <p className="text-sm text-[#F6911D]">
                          {t('ReadMore')}
                        </p>
                        <MdArrowForward size={24} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

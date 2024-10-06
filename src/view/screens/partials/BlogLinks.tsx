import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { blogData } from '../../../blogContent/blogPosts';

export function BlogLinks() {
  const { t, i18n } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  let currentLang = i18n.language.split('-')[0] as 'pt' | 'en' | 'es';
  const supportedLanguages = ['pt', 'en', 'es'];

  if (!supportedLanguages.includes(currentLang)) {
    currentLang = 'en';
  }

  console.log('Current Language:', currentLang);
  console.log('Blog Data:', blogData);

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
        <h1 className="text-center text-2xl lg:text-4xl tracking-wider text-gray-900 dark:text-white">
          {t('BlogTitle')}
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
                    to={`blog/${postId}`}
                    className="bg-white dark:bg-slate-700 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={post.image}
                      alt={translation.title}
                    />
                    <div className="py-2 px-4 w-full flex justify-between bg-orange-500">
                      <p className="text-sm text-white font-semibold tracking-wide">
                        {translation.author || 'Autor Desconhecido'}
                      </p>
                      <p className="text-sm text-white font-semibold tracking-wide">
                        {translation.date || 'Data Desconhecida'}
                      </p>
                    </div>
                    <div className="px-4 py-4">
                      <h2 className="text-2xl text-gray-900 dark:text-white font-semibold tracking-wider">
                        {t(translation.title)}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base tracking-wide mt-4">
                        {t(translation.subtitle)}
                      </p>
                      <div className="pt-2 flex items-center cursor-pointer gap-x-3">
                        <p className="text-sm text-orange-500">
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

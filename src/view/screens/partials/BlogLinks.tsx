import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import { blogData } from '../../../blogContent/blogPosts';
import { LanguageTexts } from '../../../domain/locales/Language';
import { styleFirstWord } from '../../utils/StyleWord';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function BlogLinks() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const firstPostId = Object.keys(blogData)[0];
  const post = blogData[firstPostId];
  const translation = post.translations[currentLang];

  if (!translation) {
    console.error(`No translation found for language: ${currentLang}`);
    return null;
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-4 xl:px-0 py-4">
      {' '}
      {/* Diminuí o padding vertical */}
      <div
        ref={ref}
        className={classNames(
          'transition-opacity duration-500',
          inView && 'opacity-100 animate-fade-right',
          !inView && 'opacity-0',
        )}
      >
        <h1 className="text-center text-2xl lg:text-4xl font-bold tracking-wider text-gray-900 dark:text-white">
          {' '}
          {/* Diminuí o tamanho da fonte */}
          {styleFirstWord(t(LanguageTexts.blogs.title))}
        </h1>

        {/* Conteúdo com altura menor e largura de 80% */}
        <div className="mt-4 w-4/5 mx-auto bg-white dark:bg-slate-700 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-95">
          <img
            className="w-full"
            src={post.image}
            alt={translation.title}
            style={{ height: '350px', objectFit: 'cover' }} // Defini a altura da imagem para 200px
          />
          <div className="py-1 px-4 w-full flex justify-between bg-[#F6911D]">
            {' '}
            {/* Reduzi o padding vertical */}
            <p className="text-sm text-white font-semibold tracking-wide">
              {translation.author || 'Autor Desconhecido'}
            </p>
            <p className="text-sm text-white font-semibold tracking-wide">
              {translation.date || 'Data Desconhecida'}
            </p>
          </div>
          <div className="px-4 py-2">
            {' '}
            {/* Reduzi o padding geral */}
            <h2 className="text-xl text-gray-900 dark:text-white font-semibold tracking-wider">
              {' '}
              {/* Diminuí o tamanho do título */}
              {t(translation.title)}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm tracking-wide mt-2">
              {' '}
              {/* Diminuí o espaçamento e a fonte */}
              {t(translation.subtitle)}
            </p>
            <div className="pt-1 flex items-center cursor-pointer gap-x-3">
              {' '}
              {/* Reduzi o padding top */}
              <p className="text-sm text-[#F6911D]">{t('ReadMore')}</p>
              <MdArrowForward size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

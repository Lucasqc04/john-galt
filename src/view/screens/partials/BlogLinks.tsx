import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { MdArrowForward } from 'react-icons/md';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { blogData } from '../../../blogContent/blogPosts';
import Bitkit8 from '../../../blogContent/image1/image1.png';
import { LanguageTexts } from '../../../domain/locales/Language';
import { styleFirstWord } from '../../utils/StyleWord';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function BlogLinks() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const navigate = useNavigate(); // Criar uma instância do hook de navegação

  const firstPostId = Object.keys(blogData)[0];
  const post = blogData[firstPostId];
  const translation = post.translations[currentLang];

  if (!translation) {
    console.error(`No translation found for language: ${currentLang}`);
    return null;
  }

  const firstImage = post.translations.pt.sections[0].image || Bitkit8;

  const handleCardClick = () => {
    navigate(`blog/1`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-800 px-4 xl:px-0 py-4">
      <div
        ref={ref}
        className={classNames(
          'transition-opacity duration-500',
          inView && 'opacity-100 animate-fade-right',
          !inView && 'opacity-0',
        )}
      >
        <h1 className="text-center text-2xl lg:text-4xl font-bold tracking-wider text-gray-900 dark:text-white">
          {styleFirstWord(t(LanguageTexts.blogs.title))}
        </h1>

        <div
          className="mt-4 w-4/5 mx-auto bg-white dark:bg-slate-700 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-95 cursor-pointer"
          onClick={handleCardClick}
        >
          <img
            className="w-full"
            src={firstImage}
            alt={translation.title}
            style={{ height: '350px', objectFit: 'cover' }}
          />
          <div className="py-1 px-4 w-full flex justify-between bg-[#F6911D]">
            <p className="text-sm text-white font-semibold tracking-wide">
              Giovanni Dittrich e Leonardo Maximiliano
            </p>
          </div>
          <div className="px-4 py-2">
            <h2 className="text-xl text-gray-900 dark:text-white font-semibold tracking-wider">
              {t(translation.title)}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm tracking-wide mt-2">
              {t(translation.subtitle)}
            </p>
            <div className="pt-1 flex items-center cursor-pointer gap-x-3">
              <p className="text-sm text-[#F6911D]">{t('ReadMore')}</p>
              <MdArrowForward size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

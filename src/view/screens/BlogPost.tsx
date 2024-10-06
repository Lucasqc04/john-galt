import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { blogData } from '../../blogContent/blogPosts';
import { BackgroundAnimated } from '../components/BackgroundAnimated';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const post = id ? blogData[id] : undefined;

  if (!post) {
    return <h2>{t('PostNotFound')}</h2>;
  }

  const currentLang = (localStorage.getItem('language') || 'pt') as
    | 'pt'
    | 'en'
    | 'es';
  const translations = post.translations[currentLang];

  return (
    <>
      <BackgroundAnimated />
      <div className="container mx-auto p-4 max-w-3xl dark:bg-white-white">
        <div className="relative text-center mb-14 mt-[50%] sm:mt-[20%]">
          <div className="relative">
            <img
              src={post.image}
              alt={translations.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold text-white">
                {translations.title}
              </h1>
              <h2 className="text-2xl mt-2 text-gray-300">
                {translations.subtitle}
              </h2>
            </div>
          </div>
          <div className="mt-4 text-left font-light leading-relaxed">
            {translations.content.map((paragraph, index) => {
              if (index === 0) {
                const firstLetter = paragraph.charAt(0);
                const restOfText = paragraph.slice(1);
                return (
                  <p key={index} className="mb-6">
                    <span className="text-4xl font-bold inline-block mr-2">
                      {firstLetter}
                    </span>
                    {restOfText}
                  </p>
                );
              } else {
                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              }
            })}
            {translations.citation && (
              <blockquote className="mt-8 text-xl text-center font-semibold text-gray-600">
                {translations.citation}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

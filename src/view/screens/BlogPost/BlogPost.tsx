import classNames from 'classnames';
import { FaRegCircle } from 'react-icons/fa';
import image7 from '../../../blogContent/7.png';
import { LanguageTexts } from '../../../domain/locales/Language';
import { useBlogPost } from './useBlogPost';

export function BlogPost() {
  const { t, post, selectedPost, refSections, isRefsReady, scrollToSection } =
    useBlogPost();

  if (!post) {
    return <h2>{t(LanguageTexts.post.notFound)}</h2>;
  }

  return (
    <div className="min-h-screen pt-[15%] md:pt-[10%] dark:bg-gray-900 px-8">
      <header className="text-center mb-14 mt-16">
        <h1 className="text-5xl font-bold text-orange-primary">
          {selectedPost.title}
        </h1>
        <h2 className="text-2xl mt-4 text-gray-600 dark:text-gray-300">
          {selectedPost.subtitle}
        </h2>
      </header>

      <nav className="mb-12">
        <ul className="flex flex-col items-start space-y-3 mb-10">
          {selectedPost.sections.map((section, index) => (
            <li
              key={index}
              className="text-xl text-orange-primary font-medium cursor-pointer hover:underline"
              onClick={() => isRefsReady && scrollToSection(index)}
            >
              <span className="flex items-center">
                <FaRegCircle className="text-orange-primary mr-2" />
                {index + 1}. {section.title}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {selectedPost.sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (refSections.current[index] = el)}
          className={classNames(
            'mb-16 flex flex-col items-center',
            section.layout === 'left-text-right-image' && 'lg:flex-row',
            section.layout === 'right-text-left-image' && 'lg:flex-row-reverse',
          )}
        >
          {section.image && (
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              {typeof section.image === 'string' ? (
                <img
                  src={section.image}
                  alt={section.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                <img
                  src={section.image.src}
                  alt={section.title}
                  style={{
                    width: section.image.width || '100%',
                    height: section.image.height || 'auto',
                  }}
                  className="rounded-lg shadow-lg"
                />
              )}
            </div>
          )}
          <div className={`lg:w-1/2 ${section.image ? 'lg:px-10' : ''}`}>
            <h3 className="text-3xl font-semibold text-[#F6911D] dark:text-[#F6911D] mb-4">
              <span className="flex items-center">
                <FaRegCircle className="text-[#F6911D] mr-2" />
                {index + 1}. {section.title}
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {section.content}
            </p>
          </div>
        </div>
      ))}

      <div className="mb-16 flex flex-col items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <img
            src={image7}
            alt="Descrição da imagem 7"
            style={{
              width: '80%',
              height: 'auto',
            }}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

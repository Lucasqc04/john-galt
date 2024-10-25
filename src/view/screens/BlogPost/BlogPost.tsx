import classNames from 'classnames';
import { FaRegCircle } from 'react-icons/fa';
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
        <h1 className="text-5xl font-bold text-[#F6911D] dark:text-[#F6911D]">
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
              className="text-xl text-[#F6911D] dark:text-[#F6911D] font-medium cursor-pointer hover:underline"
              onClick={() => isRefsReady && scrollToSection(index)}
            >
              <span className="flex items-center">
                <FaRegCircle className="text-[#F6911D] mr-2" />
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
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
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
    </div>
  );
}

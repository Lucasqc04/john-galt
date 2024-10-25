import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogData } from '../../../blogContent/blogPosts';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function useBlogPost() {
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const [isRefsReady, setIsRefsReady] = useState(false);
  const post = blogData['krux'];
  const refSections = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (post) {
      refSections.current = new Array(
        post.translations[currentLang]?.sections.length,
      ).fill(null);
      setIsRefsReady(true);
    }
  }, [post, currentLang]);

  const translations = post.translations;
  const selectedPost = translations[currentLang] || translations['pt'];

  const scrollToSection = (index: number) => {
    const section = refSections.current[index];
    if (section) {
      const offset = window.innerHeight * 0.25;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollTo = sectionTop - offset;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  };

  return {
    t,
    post,
    isRefsReady,
    refSections,
    selectedPost,
    scrollToSection,
  };
}

import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { LanguageTexts } from '../../domain/locales/Language';
import { BackgroundAnimatedProduct } from '../components/BackgroundAnimatedProduct';

import { Navigation, Pagination } from 'swiper/modules';

import image2 from '../assets/images/about/IMG_2721.jpg';
import image1 from '../assets/images/about/IMG_2724.jpg';

export function About() {
  const { t } = useTranslation();

  const manifest = t(LanguageTexts.about.manifest, {
    returnObjects: true,
  }) as string[];

  const images = [{ src: image1 }, { src: image2 }];

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="grid grid-cols-1 md:grid-cols-12 px-8 md:px-16 min-h-screen pt-36 md:pt-0">
        {/* Título e Imagens */}
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-6 items-center md:items-start justify-center px-12 md:px-0">
          <h3 className="text-center md:text-left font-bold text-lg md:text-3xl">
            {t(LanguageTexts.about.title)}
          </h3>
          <span className="text-center font-semibold text-base md:text-2xl">
            {t(LanguageTexts.about.subtitle)}
          </span>
          <div className="w-full md:w-4/5 mt-4">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              className="relative rounded-lg shadow-lg"
              style={
                {
                  '--swiper-navigation-color': '#999',
                  '--swiper-navigation-size': '20px',
                  '--swiper-pagination-bullet-color': '#ccc',
                  '--swiper-pagination-bullet-opacity': '0.6',
                } as React.CSSProperties
              }
            >
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={image.src}
                    className="w-full h-72 object-cover rounded-lg"
                    style={{ aspectRatio: '1/1' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </article>
        <article className="h-full col-span-full md:col-span-6 flex flex-col gap-y-4 items-center md:items-start justify-center py-6 md:px-6">
          <div className="w-full max-w-4xl">
            {manifest.map((paragraph, idx) => (
              <p key={idx} className="text-justify text-base md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="text-center md:text-left font-semibold text-base md:text-lg mt-8">
            {t(LanguageTexts.about.signature)}
          </p>
        </article>
      </section>
    </>
  );
}

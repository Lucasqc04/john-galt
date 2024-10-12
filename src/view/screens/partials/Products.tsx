import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageTexts, useLanguage } from '../../../domain/locales/Language';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';
import { styleFirstWord } from '../../utils/StyleFirstWord';

type Infos = {
  title: string;
  description: string;
};

export function Products() {
  const { t } = useTranslation();

  const infos = t(LanguageTexts.products.infos, {
    returnObjects: true,
  }) as Infos[];

  const products = [
    {
      img: Bitkit1,
      title: infos[0].title,
      description: infos[0].description,
    },
    {
      img: Bitkit7,
      title: infos[1].title,
      description: infos[1].description,
    },
    {
      img: Bitkit6,
      title: infos[2].title,
      description: infos[2].description,
    },
  ];

  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const handleButton = () => {
    navigate(`/${currentLang || 'pt'}/produto`);
  };

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="w-full min-h-screen flex flex-col justify-center items-center py-12">
        <div className="container p-4 sm:p-8 dark:bg-white-white">
          <h2 className="text-6xl text-center font-bold dark:text-white mb-8">
            {styleFirstWord(t(LanguageTexts.products.title))}
          </h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-xl flex flex-col"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="mb-4 rounded h-42 object-cover"
                />
                <h1 className="text-lg text-white font-semibold mb-4">
                  {product.title}
                </h1>
                <p className="dark:text-white text-gray-700 mb-4">
                  {product.description}
                </p>
                <button
                  onClick={handleButton}
                  className="w-full font-bold bg-[#F6911D] text-white dark:text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  {t(LanguageTexts.products.buyNowButton)}
                </button>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}

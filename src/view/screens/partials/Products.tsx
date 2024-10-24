import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LanguageTexts, useLanguage } from '../../../domain/locales/Language';
import Bitkit8 from '../../assets/Bitkit/3.png';
import Bitkit9 from '../../assets/Bitkit/6.png';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import Seedkit1 from '../../assets/seedkit/1.png';
import Seedkit2 from '../../assets/seedkit/2.png';
import Seedkit3 from '../../assets/seedkit/3.png';
import Seedkit4 from '../../assets/seedkit/4.png';
import Seedkit5 from '../../assets/seedkit/5.png';
import Seedkit6 from '../../assets/seedkit/6.png';
import Seedkit7 from '../../assets/seedkit/7.png';
import Seedkit8 from '../../assets/seedkit/8.png';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';
import { styleFirstWord } from '../../utils/StyleWord';

type Infos = {
  title: string;
  description: string;
};

export function Products() {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const navigate = useNavigate();

  const infos = t(LanguageTexts.products.infos, {
    returnObjects: true,
  }) as Infos[];

  const products = [
    {
      id: 1,
      title: 'SEEDKIT',
      name: infos[0].title,
      price: 150,
      originalPrice: 180,
      description: infos[0].description,
      images: [
        Seedkit7,
        Seedkit1,
        Seedkit2,
        Seedkit3,
        Seedkit4,
        Seedkit5,
        Seedkit6,
        Seedkit8,
      ],
    },
    {
      id: 2,
      title: 'BITKIT',
      name: infos[2].title,
      price: 800,
      originalPrice: 850,
      description: infos[2].description,
      images: [
        Bitkit7,
        Bitkit1,
        Bitkit2,
        Bitkit3,
        Bitkit4,
        Bitkit5,
        Bitkit6,
        Bitkit8,
        Bitkit9,
      ],
    },
  ];

  const [currentImageIndexes, setCurrentImageIndexes] = useState<number[]>(
    Array(products.length).fill(0),
  );

  const handleNextImage = (productIndex: number) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[productIndex] =
        newIndexes[productIndex] === products[productIndex].images.length - 1
          ? 0
          : newIndexes[productIndex] + 1;
      return newIndexes;
    });
  };

  const handlePrevImage = (productIndex: number) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[productIndex] =
        newIndexes[productIndex] === 0
          ? products[productIndex].images.length - 1
          : newIndexes[productIndex] - 1;
      return newIndexes;
    });
  };

  const handleButton = (productId: number) => {
    navigate(`/${currentLang || 'pt'}/produto/${productId}`);
  };

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="w-full min-h-screen flex flex-col justify-center items-center py-10">
        <div className="container p-4 sm:p-8 ">
          <h2 className="text-4xl text-center font-bold dark:text-white mb-8">
            {styleFirstWord(t(LanguageTexts.products.title))}
          </h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 gap-y-4">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-xl flex flex-col"
              >
                <h2 className="text-center pb-2 font-bold text-xl">
                  {product.title}
                </h2>
                <div className="flex items-center justify-center relative">
                  <button
                    onClick={() => handlePrevImage(idx)}
                    className="bg-[#F6911D] text-white p-2 rounded-full absolute left-0 transform -translate-x-1/2"
                  >
                    <FaChevronLeft />
                  </button>

                  <img
                    src={product.images[currentImageIndexes[idx]]}
                    alt={product.name}
                    className="w-96 h-72 object-contain rounded-md"
                  />

                  <button
                    onClick={() => handleNextImage(idx)}
                    className="bg-[#F6911D] text-white p-2 rounded-full absolute right-0 transform translate-x-1/2"
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <p className="dark:text-white my-4 text-gray-700 mb-4 whitespace-nowrap text-center">
                  {product.description}
                </p>
                <button
                  onClick={() => handleButton(product.id)}
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

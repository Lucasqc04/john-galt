/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight, FaTruckFast } from 'react-icons/fa6';
import { MdCheck } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { LanguageTexts } from '../../domain/locales/Language';
import Bitkit1 from '../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../assets/Bitkit/Bitkit 7.png';
import { Loader } from '../components/Loader';
import { BackgroundAnimatedProduct } from '../styles/Products/Product.styles';
import { BlogLinks } from './partials/BlogLinks';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
};

type ShippingOption = {
  id: number;
  name: string;
  price: string;
  delivery_time: number;
  company: {
    id: number;
    name: string;
    picture: string;
  };
};

type Infos = {
  title: string;
  description: string;
};

export function Product() {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const infos = t(LanguageTexts.products.infos, {
    returnObjects: true,
  }) as Infos[];

  const resources = t(LanguageTexts.products.resources, {
    returnObjects: true,
  }) as string[];

  useEffect(() => {
    const products = [
      {
        id: 1,
        name: infos[0].title,
        price: 150,
        originalPrice: 180,
        description: infos[0].description,
        images: [Bitkit1, Bitkit2, Bitkit3, Bitkit4, Bitkit5],
      },
      {
        id: 3,
        name: infos[2].title,
        price: 800,
        originalPrice: 850,
        description: infos[2].description,
        images: [Bitkit7, Bitkit1, Bitkit2, Bitkit3, Bitkit4, Bitkit5, Bitkit6],
      },
    ];

    const selectedProduct = products.find((p) => p.id === Number(id));
    setProduct(selectedProduct || null);
    setCurrentImageIndex(0);
  }, [id, infos]);

  if (!product) {
    return <Loader />;
  }
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.images.length! - 1 : prevIndex - 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleCalculateShipping = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}shipping/calculate`, {
        cep: cep,
      });
      setShippingOptions(response.data.options);
      console.log('Frete calculado com sucesso');
    } catch (error) {
      setError('Erro ao calcular o frete. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="min-h-screen pt-[35%] md:pt-[15%] lg:pt-[10%]">
        <div className="max-w-7xl mx-auto p-4">
          <div className="lg:flex lg:gap-12">
            <div className="lg:w-1/2 mb-6 lg:mb-0 relative">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handlePrevImage}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronLeft />
                </button>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-[80%] h-auto object-cover rounded-md shadow-lg"
                />
                <button
                  onClick={handleNextImage}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="flex mt-4 space-x-2 justify-center">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className={`w-12 h-12 md:w-16 md:h-16 object-cover cursor-pointer border ${
                      currentImageIndex === index
                        ? 'border-[#F6911D]'
                        : 'border-gray-300'
                    } rounded-md`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="dark:text-white line-through text-lg">
                R${product.originalPrice.toFixed(2)}
              </div>
              <div className="dark:text-gray-400 text-3xl md:text-4xl font-bold mb-4">
                R${product.price.toFixed(2)}
              </div>
              <p className="dark:text-white mb-6">{product.description}</p>

              <div className="flex items-center mb-6">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleCalculateShipping}
                  className="bg-[#F6911D] text-white p-2 rounded-md ml-2"
                  disabled={loading}
                >
                  {loading ? 'Calculando...' : 'Calcular Frete'}
                </button>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FaTruckFast className="text-lg md:text-2xl text-black dark:text-white mr-2" />
                  <h1 className="text-lg md:text-2xl font-bold dark:text-white">
                    Opções de Envio:
                  </h1>
                </div>

                {shippingOptions.length > 0 ? (
                  <ul className="ml-4">
                    {shippingOptions.map((option) => (
                      <li
                        key={option.id}
                        className="flex items-center dark:text-white mb-2"
                      >
                        <img
                          src={option.company.picture}
                          alt={option.company.name}
                          className="w-10 h-10 mr-2"
                        />
                        <div>
                          <strong>{option.name}</strong>: R${' '}
                          {parseFloat(option.price).toFixed(2)} - Entrega em{' '}
                          {option.delivery_time} dias
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="ml-2 text-lg md:text-2xl dark:text-white">
                    Informe o CEP
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-20 mt-36 text-center ">
              {t(LanguageTexts.products.resourcesTitle)}
              <span className="text-[#F6911D]"> Kit</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <ul key={index} className="list-none">
                  <li className="flex items-center gap-x-4">
                    <MdCheck size={32} className="text-green-700" />
                    <span className="dark:text-white font-medium text-lg md:text-xl">
                      {resource}
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <div className="mt-24 mb-44 mr-auto ml-auto">
            <BlogLinks />
          </div>
        </div>
      </div>
    </>
  );
}

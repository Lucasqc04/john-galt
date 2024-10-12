import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTruckFast } from 'react-icons/fa6';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BlogLinks } from '../../screens/partials/BlogLinks';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const productData: Product = {
    id: 1,
    name: 'Bitkit',
    price: 850.0,
    originalPrice: 1299.0,
    description: 'Um verdadeiro bunker para guardar seu bitcoin',
    images: [Bitkit6, Bitkit7, Bitkit1, Bitkit2, Bitkit3, Bitkit4, Bitkit5],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productData.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const resources = [
    'Open Source',
    'Câmera para transações totalmente air-gapped',
    'Dispositivo Amnésico',
    'Conexão usb',
    'Passphrase',
    'Endereços Multisig',
    'Bateria carregável',
    'Suporte a PSBT',
    'Criação de Mnemonico com entropia manual',
    '6 métodos de Backup de Mnemonico',
    'Tela sensível ao toque LCD de 2,0 polegadas',
    'Compatibilidade com Bip39',
    'Papel para anotação das 12 ou 24 palavras',
    'Punção automático para marcação em placa de metal',
    'Placa de metal',
    'Compatibilidade com Sparrow Wallet, Specter Desktop, Nunchuk e BlueWallet',
  ];

  useEffect(() => {
    setProduct(productData);
  }, []);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="min-h-screen pt-[35%] md:pt-[15%] lg:pt-[10%]">
        <div className="max-w-7xl mx-auto p-4">
          <div className="lg:flex lg:gap-12">
            {/* Carousel Section */}
            <div className="lg:w-1/2 mb-6 lg:mb-0 relative">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handlePrevImage}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronLeft />
                </button>

                <img
                  src={productData.images[currentImageIndex]}
                  alt={productData.name}
                  className="w-[80%] h-auto object-cover rounded-md shadow-lg"
                />

                <button
                  onClick={handleNextImage}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Thumbnail Section */}
              <div className="flex mt-4 space-x-2 justify-center">
                {productData.images.map((image, index) => (
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

            {/* Product Info Section */}
            <div className="lg:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
                {productData.name}
              </h1>
              <div className="dark:text-white line-through text-lg">
                R${productData.originalPrice.toFixed(2)}
              </div>
              <div className="dark:text-gray-400 text-3xl md:text-4xl font-bold mb-4">
                R${productData.price.toFixed(2)}
              </div>
              <p className="dark:text-white mb-6">{productData.description}</p>

              <div className="flex items-center mb-6">
                <input
                  type="number"
                  className="border py-2 px-4 w-12 md:w-16 text-center rounded-md dark:bg-slate-800 dark:text-gray-400"
                  defaultValue={1}
                />
              </div>
              <div className="mb-4">
                <button className="bg-[#F6911D] text-lg md:text-2xl text-white w-[60%] md:w-[40%] py-2 md:py-4 px-6 rounded-md">
                  Comprar
                </button>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FaTruckFast className="text-lg md:text-2xl text-black dark:text-white mr-2" />
                  <h1 className="text-lg md:text-2xl font-bold dark:text-white">
                    Envio: R$ 40,00 (para todo o Brasil)
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Digite seu CEP"
                    className="border py-2 px-4 w-40 md:w-48 rounded-md dark:bg-slate-800"
                  />
                  <button className="bg-[#F6911D] text-white py-2 px-6 rounded-md">
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-20 mt-36 text-center ">
              Recursos Básicos e Avançados em um só
              <span className="text-[#F6911D]"> Kit</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <ul key={index} className="list-none">
                  <li className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="green"
                      className="w-6 h-6 md:w-10 md:h-10 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
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
};

export default Product;

import React, { useEffect, useState } from 'react';
import { FaTruckFast } from 'react-icons/fa6';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BlogLinks } from '../../screens/partials/BlogLinks';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const productData: Product = {
    id: 1,
    name: 'Trezor One – Curso Grátis',
    price: 850.0,
    originalPrice: 1299.0,
    description: 'Um verdadeiro bunker para guardar seu bitcoin',
    imageUrl: Bitkit7,
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

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="min-h-screen pt-[35%] md:pt-[15%] lg:pt-[15%]">
        <div className="max-w-7xl mx-auto p-4">
          <div className="lg:flex lg:gap-12">
            <div className="lg:w-1/2 mb-6 lg:mb-0">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-[80%] ml-5 h-auto object-cover rounded-md shadow-lg"
              />
            </div>

            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold dark:text-white mb-4">
                {product.name}
              </h1>
              <div className="dark:text-white line-through text-lg">
                R${product.originalPrice.toFixed(2)}
              </div>
              <div className="dark:text-gray-400 text-4xl font-bold mb-4">
                R${product.price.toFixed(2)}
              </div>
              <p className="dark:text-white mb-6">{product.description}</p>

              <div className="flex items-center mb-6">
                <input
                  type="number"
                  className="border py-2 px-4 w-16 text-center rounded-md dark:bg-slate-800 dark:text-gray-400"
                  defaultValue={1}
                />
              </div>
              <div className="mb-4">
                <button className="bg-orange-600 text-2xl text-white w-[40%] py-4 px-6 rounded-md">
                  Comprar
                </button>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FaTruckFast className="text-2xl text-black dark:text-white mr-2" />
                  <h1 className="text-2xl font-bold dark:text-white">
                    Envio: R$ 40,00 (para todo o Brasil)
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Digite seu CEP"
                    className="border py-2 px-4 w-48 rounded-md dark:bg-slate-800"
                  />
                  <button className="bg-orange-600 text-white py-2 px-6 rounded-md">
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-20 mt-36 text-center ">
              Recursos Básicos e Avançados em um só
              <span className="text-orange-600"> Kit</span>
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
                      className="w-10 h-10 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="dark:text-white font-medium text-xl">
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

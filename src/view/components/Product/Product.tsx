import React, { useEffect, useState } from 'react';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Simulação de dados recebidos da "API"
  const productData: Product = {
    id: 1,
    name: 'Trezor One – Curso Grátis',
    price: 477.0,
    originalPrice: 1299.0,
    description:
      'A sua Trezor One suporta mais de 7.000 criptomoedas, incluindo Bitcoin, Ethereum, Litecoin e Polygon, permitindo que você gerencie vários ativos com a mesma carteira de hardware.',
    imageUrl: Bitkit1, // Insira o caminho correto da imagem
  };

  const relatedProductsData: RelatedProduct[] = [
    {
      id: 2,
      name: 'Trezor Safe 5 – Curso Grátis',
      price: 1699.0,
      imageUrl: Bitkit6, // Imagem fictícia
    },
    {
      id: 3,
      name: 'Trezor Safe 3 – Curso Grátis',
      price: 829.0,
      imageUrl: Bitkit7,
    },
    {
      id: 4,
      name: 'SecuX V20 – Curso Grátis',
      price: 699.0,
      imageUrl: Bitkit7,
    },
    {
      id: 5,
      name: 'Ledger Nano X Plus – Curso Grátis',
      price: 1499.0,
      imageUrl: Bitkit7,
    },
  ];

  const blogPostsData: BlogPost[] = [
    {
      id: 1,
      title: 'O Futuro das Criptomoedas',
      description: 'Descubra as tendências e previsões para o mercado cripto.',
      imageUrl: Bitkit7,
    },
    {
      id: 2,
      title: 'Como Proteger Seus Ativos Digitais',
      description:
        'Veja as melhores práticas para segurança em carteiras digitais.',
      imageUrl: Bitkit7,
    },
    {
      id: 3,
      title: 'Bitcoin: Uma Nova Era Financeira',
      description: 'Entenda como o Bitcoin está mudando o cenário econômico.',
      imageUrl: Bitkit7,
    },
  ];

  // Simula a chegada dos dados da "API"
  useEffect(() => {
    setProduct(productData);
    setRelatedProducts(relatedProductsData);
    setBlogPosts(blogPostsData);
  }, []);

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <BackgroundAnimatedProduct />
      <div className="  min-h-screen  pt-[35%] md:pt-[15%] lg:pt-[15%]">
        <div className="max-w-7xl mx-auto p-4 ">
          <div className="lg:flex lg:gap-12 ">
            <div className="lg:w-1/2 mb-6 lg:mb-0 ">
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
              <div className=" dark:text-gray-400 text-4xl font-bold mb-4">
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

          <div className="mt-24">
            <h2 className="text-center text-4xl font-bold dark:text-white mb-6">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white p-4 shadow-lg rounded-md dark:bg-slate-600"
                >
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {relatedProduct.name}
                  </h3>
                  <p className="dark:text-white font-bold mb-4">
                    R${relatedProduct.price.toFixed(2)}
                  </p>
                  <button className="bg-gray-700 text-white py-2 px-4 rounded-md w-full">
                    Ver opções
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 mb-44 mr-auto ml-auto">
            <h2 className="text-center text-4xl font-bold dark:text-white mb-6">
              Blog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {blogPosts.map((blogPost) => (
                <div
                  key={blogPost.id}
                  className="bg-white dark:bg-slate-600 p-4 shadow-lg rounded-md  dark:text-white"
                >
                  <img
                    src={blogPost.imageUrl}
                    alt={blogPost.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold  dark:text-white">
                    {blogPost.title}
                  </h3>
                  <p className="dark:text-white mb-4">{blogPost.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

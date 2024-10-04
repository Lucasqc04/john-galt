import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BackgroundAnimatedProducts } from '../../styles/Products/Products.styles';

export function Products() {
  const products = [
    {
      id: 1,
      img: Bitkit1,
      title: ' Seu Kit Completo para o Mundo do Bitcoin!',
      description:
        ' Tenha tudo o que precisa em um único pacote para maximizar seus investimentos em Bitcoin.',
    },
    {
      id: 2,
      img: Bitkit7,
      title: ' Proteja Suas Chaves Privadas com Segurança!',
      description:
        ' Ideal para investidores que priorizam a segurança e desejam garantir a proteção de suas chaves privadas.',
    },
    {
      id: 3,
      img: Bitkit6,
      title: ' Segurança Elevada para Seus Investimentos!',
      description:
        ' Para aqueles que buscam o mais alto nível de proteção em suas transações financeiras.',
    },
  ];

  return (
    <>
      <BackgroundAnimatedProducts />
      <div className="container mx-auto p-4 dark:bg-white-white">
        <div className="text-center mb-14 mt-6">
          <h1 className="text-5xl font-bold dark:text-white">
            <span className="text-orange-500">Nossos</span> Produtos
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-xl flex flex-col"
            >
              <img
                src={product.img}
                alt={product.title}
                className="mb-4 rounded h-32 object-cover"
              />
              <h1 className="text-lg font-semibold mb-2 flex-grow">
                {product.title}
              </h1>
              <p className="text-gray-700 mb-4 flex-grow">
                {product.description}
              </p>
              <button className="w-full font-bold bg-orange-500  text-white dark:text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
                Comprar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../domain/locales/Language';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';

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
            <span className="text-[#F6911D]">Nossos</span> Produtos
          </h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8">
            {products.map((product) => (
              <div
                key={product.id}
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
                  Comprar Agora
                </button>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}

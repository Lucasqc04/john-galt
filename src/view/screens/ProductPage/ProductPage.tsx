import { FormProvider } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight, FaTruckFast } from 'react-icons/fa6';
import { MdCheck } from 'react-icons/md';
import { LanguageTexts } from '../../../domain/locales/Language';

import { Loader } from '../../components/Loader';
import { BackgroundAnimatedProduct } from '../../styles/Products/Product.styles';
import { styleLastWord } from '../../utils/StyleWord';
import { BlogLinks } from '../partials/BlogLinks';
import { useProductPage } from './useProductPage';

export function ProductPage() {
  const {
    t,
    cart,
    form,
    image,
    loading,
    product,
    quantity,
    shipping,
    resources,
    register,
  } = useProductPage();

  if (!product) {
    return <Loader />;
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
                  onClick={image.prev}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronLeft />
                </button>
                <img
                  src={product.images[image.current]}
                  alt={product.name}
                  className="w-[80%] h-auto object-cover rounded-md shadow-lg dark:border-gray-700"
                />
                <button
                  onClick={image.next}
                  className="bg-[#F6911D] text-white p-2 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="flex mt-4 space-x-2 justify-center">
                {product.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Thumbnail ${index}`}
                    className={`w-12 h-12 md:w-16 md:h-16 object-cover cursor-pointer border ${
                      image.current === index
                        ? 'border-[#F6911D]'
                        : 'border-gray-300 dark:border-gray-700'
                    } rounded-md`}
                    onClick={() => image.thumbnail(index)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
                {product.name}
              </h1>
              <h4 className="text-xl md:text-2xl font-bold dark:text-white mb-3">
                {product.title}
              </h4>
              <div className="text-lg dark:text-gray-400 line-through">
                R${product.originalPrice.toFixed(2)}
              </div>
              <div className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
                R${product.price.toFixed(2)}
              </div>
              <p className="dark:text-gray-300 mb-6">{product.description}</p>
              <div className="flex items-center mb-6">
                <input
                  type="number"
                  value={quantity.value}
                  onChange={(e) => quantity.set(Number(e.target.value))}
                  min={1}
                  className="w-16 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  onClick={cart.add}
                  className="bg-[#F6911D] text-white p-2 rounded-md ml-2"
                >
                  {t(LanguageTexts.products.addToCartButton)}
                </button>
              </div>
              <FormProvider {...form}>
                <form className="flex items-center mb-6">
                  <input
                    type="text"
                    placeholder="Digite seu CEP"
                    {...register('postalCode')}
                    className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    onClick={shipping.calculate}
                    className="bg-[#F6911D] text-white p-2 rounded-md ml-2"
                    disabled={loading}
                  >
                    {loading ? 'Calculando...' : 'Calcular Frete'}
                  </button>
                </form>
              </FormProvider>

              <div>
                <div className="flex items-center mb-4">
                  <FaTruckFast className="text-lg md:text-2xl text-black dark:text-white mr-2" />
                  <span className="text-lg md:text-2xl font-bold dark:text-white">
                    Opções de Envio:
                  </span>
                </div>

                {shipping.options.length > 0 ? (
                  <ul className="ml-4 flex flex-col gap-y-2">
                    {shipping.options.map((option) => (
                      <li
                        key={option.id}
                        className="flex items-center dark:text-white gap-x-2"
                      >
                        <img
                          src={option.company.picture}
                          alt={option.company.name}
                          className="w-16"
                        />
                        <div>
                          <strong>{option.name}</strong>: R${' '}
                          {option.price && (
                            <>
                              {parseFloat(option.price).toFixed(2)}. Entrega em
                              <strong> {option.deliveryTime} dias</strong>
                            </>
                          )}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-20 mt-36 text-center dark:text-white">
              {styleLastWord(t(LanguageTexts.products.resourcesTitle))}
            </h2>
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

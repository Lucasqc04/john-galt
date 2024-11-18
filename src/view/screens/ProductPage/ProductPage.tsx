import classNames from 'classnames';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { MdCheck } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { LanguageTexts } from '../../../domain/locales/Language';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { Loader } from '../../components/Loader';
import { styleLastWord } from '../../utils/StyleWord';
import { useWindowSize } from '../../utils/useWindowSize';
import './product-page.css';
import { useProductPage } from './useProductPage';

export function ProductPage() {
  const { t, cart, form, loading, product, quantity, shipping, register } =
    useProductPage();
  const { width } = useWindowSize();

  const [mainImage, setMainImage] = useState(product?.images[0]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) {
    return <Loader />;
  }

  const handleImageClick = (index: number) => {
    setMainImage(product.images[index]);
    setCurrentIndex(index);
  };

  const getVisibleImages = () => {
    const visibleImages = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % product.images.length;
      visibleImages.push(product.images[index]);
    }
    return visibleImages;
  };

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="min-h-screen px-10 pt-32 sm:grid sm:grid-cols-12 sm:px-8">
        <article className="sm:hidden">
          <h2 className="text-2xl leading-9 text-[#1E1E1E] font-bold">
            {product.name}
          </h2>
          <Slider
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            draggable={true}
            arrows={false}
            dots={true}
            className="pt-4"
          >
            {product.images.map((image, idx) => (
              <div key={idx}>
                <img
                  src={image}
                  alt={`Imagem do Produto ${idx + 1}`}
                  className="w-full"
                />
              </div>
            ))}
          </Slider>
        </article>

        <article className="hidden sm:col-span-8 sm:row-span-2 sm:flex sm:justify-around">
          <div className="flex flex-col h-full justify-between">
            {getVisibleImages().map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem do Produto ${index + 1}`}
                className="w-28 cursor-pointer border border-solid border-black rounded-md"
                onClick={() =>
                  handleImageClick(
                    (currentIndex + index) % product.images.length,
                  )
                }
              />
            ))}
          </div>
          <img
            src={mainImage ?? product.images[0]}
            alt={`Imagem do Produto Principal`}
            className="w-[360px]"
          />
        </article>

        <article className="flex flex-col gap-y-2 sm:col-span-4">
          <h2 className="hidden sm:block text-2xl leading-9 text-[#1E1E1E] font-bold">
            {product.name}
          </h2>
          <div className="pt-12 sm:pt-4 flex items-start">
            <span className="text-xl leading-5">R$</span>
            <h2 className="text-4xl font-bold leading-5">
              {product.price.toFixed(2)}
            </h2>
          </div>
          <div className="flex flex-col gap-y-2 pt-2">
            <span className="text-sm">Disponível para parcelamento</span>
            <span className="text-[#4133FF] text-sm">
              Ver os métodos de pagamento
            </span>
          </div>
        </article>

        <FormProvider {...form}>
          <form className="flex flex-col gap-y-2 pt-6 col-span-4">
            <div
              className={classNames(
                'flex items-end gap-x-4',
                width <= 360 && 'flex-col gap-y-2 items-center',
                width >= 768 && width <= 843 && 'flex-col gap-y-2 items-center',
              )}
            >
              <div className="w-full flex flex-col">
                <label htmlFor="postalCode">Calcular Frete</label>
                <input
                  type="text"
                  placeholder={t(LanguageTexts.shipping.enterZip)}
                  {...register('postalCode')}
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '');
                    e.target.value = onlyNumbers.slice(0, 8);
                  }}
                  className="bg-[#EDEDED] p-3 rounded-md"
                />
              </div>
              <button
                onClick={shipping.calculate}
                className="bg-[#EDEDED] p-2 rounded-md w-full h-12 text-center text-sm"
                disabled={loading}
              >
                {loading
                  ? t(LanguageTexts.shipping.loading)
                  : t(LanguageTexts.shipping.calculateButton)}
              </button>
            </div>
            <div className="flex items-center bg-[#D9D9D9] h-12 px-2 py-5 rounded-md gap-x-1">
              <label htmlFor="shippingCalculate" className="uppercase text-sm">
                Quantidade:
              </label>
              <input
                type="number"
                id="shippingCalculate"
                value={quantity.value}
                className="bg-transparent text-sm outline-none"
                onChange={(e) => quantity.set(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="pt-4 flex gap-x-4 justify-between sm:flex-col sm:h-32 sm:gap-y-2">
              <button
                onClick={cart.buy}
                className="bg-orange-primary text-white p-2 rounded-md text-sm w-36 sm:w-full sm:gap-y-4 h-14"
              >
                Comprar Agora
              </button>
              <button
                onClick={cart.add}
                className=" text-white p-2 rounded-md text-sm h-14 bg-[#242F3F]"
              >
                {t(LanguageTexts.products.addToCartButton)}
              </button>
            </div>
          </form>
        </FormProvider>

        <div className="py-16 flex flex-col gap-y-6 sm:col-span-12 sm:row-span-12">
          <h2 className="text-3xl font-bold text-center dark:text-white">
            {styleLastWord(t(LanguageTexts.products.resourcesTitle))}
            <span className="text-orange-primary">{product.name}</span>
          </h2>
          <div className="grid grid-cols-12 gap-6">
            {product.resources.map((resource: string, index: number) => (
              <ul key={index} className="list-none col-span-12">
                <li className="flex items-center gap-x-4">
                  <MdCheck size={32} className="text-green-700" />
                  <span className="dark:text-white font-medium text-sm">
                    {resource}
                  </span>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

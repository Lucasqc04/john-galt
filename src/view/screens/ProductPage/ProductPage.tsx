import { FormProvider } from 'react-hook-form';
import { MdCheck } from 'react-icons/md';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { LanguageTexts } from '../../../domain/locales/Language';
import { BackgroundAnimatedProduct } from '../../components/BackgroundAnimatedProduct';
import { Loader } from '../../components/Loader';
import { styleLastWord } from '../../utils/StyleWord';
import './product-page.css';
import { useProductPage } from './useProductPage';

export function ProductPage() {
  const { t, cart, form, loading, product, quantity, shipping, register } =
    useProductPage();

  if (!product) {
    return <Loader />;
  }

  return (
    <>
      <BackgroundAnimatedProduct />
      <section className="min-h-screen px-10 pt-32">
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
        <article className="flex flex-col gap-y-2">
          <div className="pt-12 flex items-start">
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
          <form className="flex flex-col gap-y-2 pt-6">
            <div className="flex items-end gap-x-4">
              <div className="flex flex-col">
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
            <div className="pt-4 flex gap-x-4 justify-between">
              <button
                onClick={cart.buy}
                className="bg-orange-primary text-white p-2 rounded-md text-sm w-36 h-12"
              >
                Comprar Agora
              </button>
              <button
                onClick={cart.add}
                className=" text-white p-2 rounded-md text-sm h-12 bg-[#242F3F]"
              >
                {t(LanguageTexts.products.addToCartButton)}
              </button>
            </div>
          </form>
        </FormProvider>
        <div className="py-16 flex flex-col gap-y-6">
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

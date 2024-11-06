import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Items } from '../../../domain/entities/payment.entity';
import {
  CalculatedShipping,
  CalculateShipping,
} from '../../../domain/entities/Shipping.entity';
import { UseCases } from '../../../domain/usecases/UseCases';

import { Product } from '../../../domain/entities/Product.entity';
import { useCartContext } from '../../context/CartContext';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';
import { useProducts } from '../../utils/useProduct';

export function useProductPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { products, infos } = useProducts();
  const { currentLang } = useCurrentLang();
  const { add } = useCartContext();

  const form = useForm<CalculateShipping>();
  const { register, handleSubmit } = form;

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [shippingOptions, setShippingOptions] = useState<CalculatedShipping[]>(
    [],
  );
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct || null);
    setCurrentImageIndex(0);
  }, [id, infos, products]);

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const onSubmit: SubmitHandler<CalculateShipping> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (data.postalCode.length < 8) {
        return;
      }

      const { result } = await UseCases.shipping.calculate.execute(data);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            setError('Erro ao calcular o frete. Tente novamente.');
            return;
          default:
            alert('ERRO DESCONHECIDO');
            setError('Erro ao calcular o frete. Tente novamente.');
            return;
        }
      }
      setShippingOptions(result.data);
    } finally {
      setLoading(false);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      const productToAdd: Items = {
        id: product.id,
        name: product.name,
        title: product.title,
        price: product.price,
        quantity,
        imageUrl: product.images[0],
        categoryId: product.name,
        description: product.description,
      };

      add(productToAdd);

      Swal.fire({
        title: t('products.addToCartButton'),
        text: `${productToAdd.name} (${t('products.quantity')}: ${quantity})`,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: t('products.goToCart'),
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(ROUTES.products.call(currentLang));
        } else if (result.isDismissed) {
          navigate(ROUTES.cart.call(currentLang));
        }
      });
    }
  };

  useEffect(() => {
    localStorage.getItem('cartItems');
  }, []);

  return {
    t,
    form,
    product,
    loading,
    currentLang,
    register,
    cart: {
      add: handleAddToCart,
    },
    image: {
      next: handleNextImage,
      prev: handlePrevImage,
      current: currentImageIndex,
      thumbnail: handleThumbnailClick,
    },
    quantity: {
      value: quantity,
      set: setQuantity,
    },
    shipping: {
      calculate: handleSubmit(onSubmit),
      options: shippingOptions,
    },
  };
}

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
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState(product?.images[0] || '');
  const [shippingOptions, setShippingOptions] = useState<CalculatedShipping[]>(
    [],
  );

  const { t } = useTranslation();
  const { add } = useCartContext();
  const { currentLang } = useCurrentLang();
  const { products, infos } = useProducts();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const form = useForm<CalculateShipping>();

  const { register, handleSubmit } = form;

  useEffect(() => {
    localStorage.getItem('cartItems');
  }, []);

  useEffect(() => {
    if (product) {
      setCurrentImage(product.images[imageIndex]);
    }
  }, [imageIndex, product]);

  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === id);
    setProduct(selectedProduct || null);
  }, [id, infos, products]);

  const image = {
    index: imageIndex,
    current: currentImage,
    next: () => {
      setImageIndex(
        (prevIndex) => (prevIndex + 1) % (product?.images.length || 1),
      );
    },
    prev: () => {
      setImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + (product?.images.length || 1)) %
          (product?.images.length || 1),
      );
    },
    thumbnail: (index: number) => {
      setImageIndex(index);
    },
  };

  const onSubmit: SubmitHandler<CalculateShipping> = async (data) => {
    setLoading(true);
    try {
      if (data.postalCode.length < 8) {
        return;
      }

      const { result } = await UseCases.shipping.calculate.execute(data);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            return;
          default:
            alert('ERRO DESCONHECIDO');
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

  return {
    t,
    form,
    image,
    product,
    loading,
    register,
    cart: {
      add: handleAddToCart,
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

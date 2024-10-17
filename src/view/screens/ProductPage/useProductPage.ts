import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { LanguageTexts } from '../../../domain/locales/Language';
import Bitkit1 from '../../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../../assets/Bitkit/Bitkit 7.png';

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
};

type ShippingOption = {
  id: number;
  name: string;
  price?: string;
  company: {
    id: number;
    name: string;
    picture: string;
  };

  discount?: number;
  currency?: string;
  deliveryTime?: number;
  customPrice?: number;
  customDeliveryTime?: number;
  deliveryRange?: {
    max: number;
    min: number;
  };
  additionalServices?: {
    collect: false;
    ownHand: false;
    receipt: false;
  };
};

type Infos = {
  title: string;
  description: string;
};

export function useProductPage() {
  const { t } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [postalCode, setPostalCode] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const infos = useMemo(() => {
    return t(LanguageTexts.products.infos, {
      returnObjects: true,
    }) as Infos[];
  }, [t]);

  const resources = useMemo(() => {
    return t(LanguageTexts.products.resources, {
      returnObjects: true,
    }) as string[];
  }, [t]);

  useEffect(() => {
    const products = [
      {
        id: 1,
        name: infos[0].title,
        price: 150,
        originalPrice: 180,
        description: infos[0].description,
        images: [Bitkit1, Bitkit2, Bitkit3, Bitkit4, Bitkit5],
      },
      {
        id: 3,
        name: infos[2].title,
        price: 800,
        originalPrice: 850,
        description: infos[2].description,
        images: [Bitkit7, Bitkit1, Bitkit2, Bitkit3, Bitkit4, Bitkit5, Bitkit6],
      },
    ];

    const selectedProduct = products.find((p) => p.id === Number(id));
    setProduct(selectedProduct || null);
    setCurrentImageIndex(0);
  }, [id, infos]);

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

  const handleCalculateShipping = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/shipping/calculate`, {
        postalCode: postalCode,
      });
      setShippingOptions(response.data);
      console.log('Frete calculado com sucesso');
    } catch (error) {
      setError('Erro ao calcular o frete. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    t,
    product,
    loading,
    image: {
      next: handleNextImage,
      prev: handlePrevImage,
      current: currentImageIndex,
      thumbnail: handleThumbnailClick,
    },
    shipping: {
      calculate: handleCalculateShipping,
      options: shippingOptions,
    },
    postalCode: {
      value: postalCode,
      set: setPostalCode,
    },
    resources,
  };
}

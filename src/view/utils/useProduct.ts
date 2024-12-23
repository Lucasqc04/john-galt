import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Item, Product } from '../../domain/entities/Product.entity';
import { LanguageTexts } from '../../domain/locales/Language';
import Bitkit8 from '../assets/Bitkit/3.png';
import Bitkit9 from '../assets/Bitkit/6.png';
import Bitkit1 from '../assets/Bitkit/Bitkit 1.png';
import Bitkit2 from '../assets/Bitkit/Bitkit 2.png';
import Bitkit3 from '../assets/Bitkit/Bitkit 3.png';
import Bitkit4 from '../assets/Bitkit/Bitkit 4.png';
import Bitkit5 from '../assets/Bitkit/Bitkit 5.png';
import Bitkit6 from '../assets/Bitkit/Bitkit 6.png';
import Bitkit7 from '../assets/Bitkit/Bitkit 7.png';
import Seedkit1 from '../assets/seedkit/1.png';
import Seedkit2 from '../assets/seedkit/2.png';
import Seedkit3 from '../assets/seedkit/3.png';
import Seedkit4 from '../assets/seedkit/4.png';
import Seedkit5 from '../assets/seedkit/5.png';
import Seedkit6 from '../assets/seedkit/6.png';
import Seedkit7 from '../assets/seedkit/7.png';
import Seedkit8 from '../assets/seedkit/8.png';

type Infos = {
  name: string;
  title: string;
  description: string;
  items?: Item[];
  resources: string[];
};

export function useProducts() {
  const { t } = useTranslation();

  const infos = useMemo(() => {
    return t(LanguageTexts.products.infos, {
      returnObjects: true,
    }) as Infos[];
  }, [t]);
  const products: Product[] = [
    {
      id: '1',
      title: infos[0].title,
      name: infos[0].name,
      originalPrice: 180,
      price: 150,
      description: infos[0].description,
      images: [
        Seedkit7,
        Seedkit1,
        Seedkit2,
        Seedkit3,
        Seedkit4,
        Seedkit5,
        Seedkit6,
        Seedkit8,
      ],
      items: infos[0].items,
      resources: infos[0].resources,
      Yampi_Product_id: 37615989,
      sku: 'EBJF7U6H7',
      sku_id: 253054601,
    },
    {
      id: '2',
      title: infos[1].title,
      name: infos[1].name,
      originalPrice: 950,
      price: 900,
      description: infos[1].description,
      images: [
        Bitkit7,
        Bitkit1,
        Bitkit2,
        Bitkit3,
        Bitkit4,
        Bitkit5,
        Bitkit6,
        Bitkit8,
        Bitkit9,
      ],
      items: infos[1].items,
      resources: infos[1].resources,
      Yampi_Product_id: 37616063,
      sku: 'NE4PUR9NF',
      sku_id: 253055425,
    },
    {
      id: '10000',
      title: infos[0].title,
      name: 'PRODUTO TESTE',
      originalPrice: 5,
      price: 3,
      description: infos[0].description,
      images: [
        Seedkit7,
        Seedkit1,
        Seedkit2,
        Seedkit3,
        Seedkit4,
        Seedkit5,
        Seedkit6,
        Seedkit8,
      ],
      resources: infos[0].resources,
      Yampi_Product_id: 37809174,
      sku: 'ANVJ5V3FA',
      sku_id: 254405963,
    },
  ];

  return {
    products,
    infos,
  };
}

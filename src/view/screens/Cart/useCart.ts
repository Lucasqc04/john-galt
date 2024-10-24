import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../domain/locales/Language';
import { useCartContext } from '../../context/CartContext';

export function useCart() {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const { items, TotalValue, updateItemQuantity, remove, clear } =
    useCartContext();
  const navigate = useNavigate();

  return {
    t,
    currentLang,
    navigate,
    cart: {
      total: TotalValue,
      items,
      clear,
      remove,
      updateItemQuantity,
    },
  };
}

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../domain/locales/Language';
import { useCartContext } from '../../context/CartContext';

export function useCart() {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const { items, updateItemQuantity, remove, clear } = useCartContext();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return {
    t,
    currentLang,
    navigate,
    cart: {
      total,
      items,
      clear,
      remove,
      updateItemQuantity,
    },
  };
}

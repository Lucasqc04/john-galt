import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetCheckout } from '../../../domain/entities/payment.entity';
import { useCartContext } from '../../context/CartContext';

const LOCAL_STORAGE_KEY = 'checkoutFormState';

export function useCheckout() {
  const { items } = useCartContext();
  const [loading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<GetCheckout>({
    mode: 'onChange',
    defaultValues: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [shippingPrice, setShippingPrice] = useState<number>(0);

  const updateTotal = useCallback(() => {
    const itemsTotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const total = itemsTotal + shippingPrice;
    form.setValue('total', total);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form.getValues()));
  }, [form, items, shippingPrice]);

  useEffect(() => {
    updateTotal();
  }, [items, shippingPrice, updateTotal]);

  const addShippingPrice = (price: number) => {
    setShippingPrice(price);
  };

  return {
    t,
    form,
    loading,
    navigate,
    steps: {
      current: currentStep,
      next: () => setCurrentStep(currentStep + 1),
      prev: () => setCurrentStep(currentStep - 1),
    },
    addShippingPrice,
  };
}

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

type Address = {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
};

type Identification = {
  type: 'CPF' | 'CNPJ';
  number: string;
};

export type CheckoutForm = {
  payerEmail: string;
  firstName: string;
  lastName: string;
  identification: Identification;
  couponCode?: string;
  address: Address;
};

export function useCheckout() {
  const { items, updateItemQuantity, remove, clear } = useCartContext();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const API_URL = String(import.meta.env.VITE_API_URL);

  const form = useForm<CheckoutForm>({
    mode: 'onChange',
    defaultValues: {
      payerEmail: '',
      firstName: '',
      lastName: '',
      identification: {
        type: 'CPF',
        number: '',
      },
      couponCode: '',
      address: {
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        zipCode: '',
      },
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = form;

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(subtotal + shipping);

  useEffect(() => {
    setTotal(subtotal + shipping - discount);
  }, [subtotal, shipping, discount]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const paymentData = {
        couponCode: data.couponCode,
        paymentMethod,
        items: items,
        payerEmail: data.payerEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        identification: data.identification,
      };

      const response = await axios.post(
        `${API_URL}/create-payment/${paymentMethod}`,
        paymentData,
      );
      if (response.data.initPoint) {
        window.location.href = response.data.initPoint;
      } else {
        alert('Pagamento não foi aprovado.');
      }
    } catch {
      alert('Ocorreu um erro ao processar o pagamento.');
    }
  };

  const applyCoupon = async () => {
    try {
      const COUPON = {
        code: getValues('couponCode'),
      };

      const response = await axios.post(`${API_URL}/coupons/is-valid`, COUPON);
      const coupon = response.data;

      if (coupon.isActive && subtotal >= coupon.minPurchaseValue) {
        const discountValue =
          coupon.discountType === 'percentage'
            ? Math.min(
                (subtotal + shipping) * (coupon.discountValue / 100),
                coupon.maxDiscountValue,
              )
            : Math.min(coupon.discountValue, coupon.maxDiscountValue);

        setDiscount(discountValue);
      } else {
        alert('Cupom inválido ou não aplicável.');
      }
    } catch {
      alert('Ocorreu um erro ao aplicar cupom.');
    }
  };

  return {
    navigate,
    applyCoupon,
    steps: {
      current: currentStep,
      next: nextStep,
      prev: prevStep,
    },
    form: {
      provider: form,
      errors,
      register,
      submit: handleSubmit(onSubmit),
    },
    paymentMethod: {
      value: paymentMethod,
      set: setPaymentMethod,
    },
    cart: {
      total,
      items,
      subtotal,
      clear,
      remove,
      updateItemQuantity,
      discount: {
        value: discount,
      },
      shipping: {
        value: shipping,
        set: setShipping,
      },
    },
    isValid,
  };
}

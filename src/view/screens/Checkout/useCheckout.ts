import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CalculatedShipping } from '../../../domain/entities/Shipping.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
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
    watch,
    formState: { errors, isValid },
  } = form;

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');
  const [currentStep, setCurrentStep] = useState(1);
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(subtotal + shipping);
  const [shippingOptions, setShippingOptions] = useState<CalculatedShipping[]>(
    [],
  );
  const navigate = useNavigate();

  const zipCode = watch('address.zipCode');

  useEffect(() => {
    setTotal(subtotal + shipping - discount);
  }, [subtotal, shipping, discount]);

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      fetchShippingOptions(zipCode);
    }
  }, [zipCode]);

  const fetchShippingOptions = async (cep: string) => {
    try {
      const { result } = await UseCases.shipping.calculate.execute({
        postalCode: cep,
      });

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
    } catch {
      alert('ERRO AO CALCULAR O FRETE');
    }
  };

  const onShippingSelect = (selectedShipping: CalculatedShipping) => {
    setShipping(parseFloat(selectedShipping.price));
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
      next: () => setCurrentStep(currentStep + 1),
      prev: () => setCurrentStep(currentStep - 1),
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
      shippingOptions,
      onShippingSelect,
    },
    isValid,
  };
}

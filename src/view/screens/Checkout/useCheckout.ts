import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

type Address = {
  street: string;
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

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const API_URL = String(import.meta.env.VITE_API_URL);

  const form = useForm<CheckoutForm>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

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

  return {
    navigate,
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
      clear,
      remove,
      updateItemQuantity,
    },
  };
}

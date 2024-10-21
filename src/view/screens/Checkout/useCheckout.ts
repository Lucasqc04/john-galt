import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category_id: string;
  description: string;
};

type Identification = {
  type: 'CPF' | 'CNPJ';
  number: string;
};

type CheckoutForm = {
  couponCode?: string;
  payerEmail: string;
  firstName: string;
  lastName: string;
  identification: Identification;
  items: Item[];
};

export function useCheckout() {
  const API_URL = String(import.meta.env.VITE_API_URL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const paymentData = {
        couponCode: data.couponCode,
        paymentMethod,
        items: data.items,
        payerEmail: data.payerEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        identification: data.identification,
      };

      const response = await axios.post(
        `${API_URL}/create-payment/${paymentMethod}`,
        paymentData,
      );
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        alert('Pagamento não foi aprovado.');
      }
    } catch {
      alert('Ocorreu um erro ao processar o pagamento.');
    }
  };

  return {
    form: {
      errors,
      register,
      submit: handleSubmit(onSubmit),
    },
    paymentMethod: {
      value: paymentMethod,
      set: setPaymentMethod,
    },
  };
}

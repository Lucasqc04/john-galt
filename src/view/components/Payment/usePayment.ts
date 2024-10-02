import { useState } from 'react';
import { Payment } from '../../../domain/entities/payment.entity';

export const usePayment = () => {
  const [paymentData, setPaymentData] = useState<Payment>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (field: keyof Payment, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitPayment = () => {
    console.log('Dados do pagamento submetidos:', paymentData);
  };

  return {
    paymentData,
    handleInputChange,
    submitPayment,
  };
};

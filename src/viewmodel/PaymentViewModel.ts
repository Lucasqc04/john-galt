// src/viewmodels/PaymentViewModel.ts
import { useState } from 'react';
import { PaymentModel } from '../model/Payment.model';

export const usePaymentViewModel = () => {
  const [paymentData, setPaymentData] = useState<PaymentModel>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Manipula mudanças nos campos de entrada
  const handleInputChange = (field: keyof PaymentModel, value: string) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Função de submissão (eventualmente conectada ao back-end)
  const submitPayment = () => {
    console.log('Dados do pagamento submetidos:', paymentData);
    // Aqui você pode fazer a chamada para o back-end
  };

  return {
    paymentData,
    handleInputChange,
    submitPayment,
  };
};

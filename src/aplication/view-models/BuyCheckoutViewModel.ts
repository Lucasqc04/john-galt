import { useState } from 'react';
import { Order } from '../../domain/entities/Order';
import { ProcessPaymentUseCase } from '../use-cases/ processPayment';

export interface ProcessPaymentRequest {
  PaymentRequest: Order;
}
export const useBuyCheckoutViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPaymentUseCase = new ProcessPaymentUseCase();

  const handleProcessPayment = async (formData: ProcessPaymentRequest) => {
    setIsLoading(true);
    setError(null);

    const result = await processPaymentUseCase.execute(formData);

    if (result.result.type === 'ERROR') {
      setError(result.result.error.code);
    }

    setIsLoading(false);
    return result;
  };

  return { handleProcessPayment, isLoading, error };
};

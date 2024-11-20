import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Brand, GetCheckout } from '../../../../domain/entities/payment.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function usePaymentForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useFormContext<GetCheckout>();
  const [brand, setBrand] = useState<Brand>('undefined');
  const method = form.watch('method');
  const paymentOption = form.watch('paymentOption');
  const cardNumber = form.watch('cardNumber');

  const handleExpiryDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/\D/g, '');
      if (value.length >= 3) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      event.target.value = value.slice(0, 5);
      form.setValue('expiryDate', event.target.value);
    },
    [form],
  );

  const identifyBrand = useCallback(
    async (cardNumber: string) => {
      setLoading(true);
      try {
        console.log('Identificando bandeira do cartão:', cardNumber);
        const { result } = await UseCases.payment.indentifyBrand.execute({
          cardNumber,
        });

        if (result.type === 'ERROR') {
          alert('Erro ao identificar bandeira');
          return;
        }

        if (result.data === 'unsupported') {
          alert('Cartão inválido ou não suportado.');
          setBrand('unsupported');
          return;
        }

        setBrand(result.data);
        form.setValue('brand', result.data);
      } finally {
        setLoading(false);
      }
    },
    [form],
  );

  useEffect(() => {
    if (cardNumber && cardNumber.length === 16) {
      identifyBrand(cardNumber);
    } else {
      setBrand('unsupported');
    }
  }, [cardNumber, identifyBrand]);

  return {
    t,
    brand,
    method,
    loading,
    paymentOption,
    handleExpiryDateChange,
    form,
  };
}

import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Brand,
  GetCheckout,
  Installment,
} from '../../../../domain/entities/payment.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function usePaymentForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<GetCheckout>();
  const [brand, setBrand] = useState<Brand>('undefined');
  const [installment, setInstallment] = useState<Installment[]>();
  const method = watch('method');
  const total = watch('total');
  const cvv = watch('cvv');

  const handleExpiryDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value.replace(/\D/g, '');

      if (value.length >= 3) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }

      event.target.value = value.slice(0, 5);
      setValue('expiryDate', event.target.value);
    },
    [setValue],
  );

  const HandleWithInstallments = useCallback(async () => {
    setLoading(true);
    try {
      const { result } = await UseCases.payment.listInstallments.execute({
        brand,
        total: Math.round(total * 100),
      });

      if (result.type === 'ERROR') {
        return;
      }

      setInstallment(result.data);
      setValue('installments', result.data);
    } finally {
      setLoading(false);
    }
  }, [total, brand, setValue]);

  useEffect(() => {
    if (cvv && cvv.length === 3) {
      HandleWithInstallments();
    }
  }, [cvv, HandleWithInstallments]);

  const identifyBrand = useCallback(
    async (cardNumber: string) => {
      const { result } = await UseCases.payment.indentifyBrand.execute({
        cardNumber,
      });

      if (result.type === 'ERROR') {
        alert('ERRO AO INDENTIFICAR BANDEIRA');
        return;
      }

      if (result.data === 'unsupported') {
        alert('CARTÃO INVÁLIDO OU NÃO SUPORTADO.');
        return;
      }

      setBrand(result.data);
      setValue('brand', brand);
    },
    [brand, setValue],
  );

  const cardNumber = watch('cardNumber');
  useEffect(() => {
    if (cardNumber && cardNumber.length === 16) {
      identifyBrand(cardNumber);
    } else {
      setBrand('unsupported');
    }
  }, [cardNumber, identifyBrand, installment]);

  return {
    t,
    brand,
    method,
    loading,
    installment,
    HandleWithInstallments,
    handleExpiryDateChange,
    form: {
      register,
      errors,
    },
  };
}

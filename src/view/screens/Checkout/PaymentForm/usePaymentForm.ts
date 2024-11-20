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
  const [installment, setInstallment] = useState<Installment[]>();
  const form = useFormContext<GetCheckout>();
  const [brand, setBrand] = useState<Brand>('undefined');
  const method = form.watch('method');
  const paymentOption = form.watch('paymentOption');
  const cardNumber = form.watch('cardNumber');
  const total = form.watch('total');

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

  const HandleWithInstallments = useCallback(async () => {
    if (paymentOption !== 'creditCard') {
      return;
    }

    setLoading(true);
    try {
      const { result } = await UseCases.payment.listInstallments.execute({
        brand,
        total: total,
      });

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'VALUE_TOO_LOW':
            alert('VALOR MUITO BAIXO');
            return;
          default:
            alert('ERRO AO BUSCAR PARCELAS');
            return;
        }
      }

      form.setValue('installments', result.data);
      setInstallment(result.data);
    } finally {
      setLoading(false);
    }
  }, [brand, total, form]);

  const identifyBrand = useCallback(
    async (cardNumber: string) => {
      setLoading(true);
      try {
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

        HandleWithInstallments();
      } finally {
        setLoading(false);
      }
    },
    [form, HandleWithInstallments],
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
    form,
    brand,
    method,
    loading,
    installment,
    paymentOption,
    handleExpiryDateChange,
  };
}

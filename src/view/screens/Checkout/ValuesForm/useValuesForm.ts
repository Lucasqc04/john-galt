import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkout } from '../useCheckout';

export function useValuesForm(selectedCrypto: 'BTC' | 'USDT') {
  const { t } = useTranslation();
  const form = useFormContext<Checkout>();

  const handleBrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      form.setValue('brlAmount', '');
      form.setValue('cryptoAmount', '');
      return;
    }

    if (numericValue > 1000000) {
      numericValue = 1000000;
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(numericValue);

    form.setValue('brlAmount', formattedValue);

    if (selectedCrypto === 'BTC') {
      if (form.getValues('btcRate') > 0) {
        form.setValue(
          'cryptoAmount',
          (numericValue / form.getValues('btcRate')).toFixed(8),
        );
      }
    } else if (selectedCrypto === 'USDT') {
      if (form.getValues('usdtRate') > 0) {
        form.setValue(
          'cryptoAmount',
          (numericValue / form.getValues('usdtRate')).toFixed(8),
        );
      }
    }
    // Atualiza o campo com o tipo da criptomoeda
    form.setValue('cryptoType', selectedCrypto);
  };

  // Efeito: recalcula a conversão sempre que a moeda selecionada mudar
  useEffect(() => {
    const brlStr = form.getValues('brlAmount');
    if (!brlStr) return;
    const numericValue = parseInt(brlStr.replace(/\D/g, ''), 10);
    if (isNaN(numericValue)) return;

    if (selectedCrypto === 'BTC') {
      if (form.getValues('btcRate') > 0) {
        form.setValue(
          'cryptoAmount',
          (numericValue / form.getValues('btcRate')).toFixed(8),
        );
      }
    } else if (selectedCrypto === 'USDT') {
      if (form.getValues('usdtRate') > 0) {
        form.setValue(
          'cryptoAmount',
          (numericValue / form.getValues('usdtRate')).toFixed(8),
        );
      }
    }
    // Atualiza o campo com o tipo da criptomoeda
    form.setValue('cryptoType', selectedCrypto);
  }, [selectedCrypto, form]);

  return {
    t,
    form,
    handleBrlChange,
  };
}

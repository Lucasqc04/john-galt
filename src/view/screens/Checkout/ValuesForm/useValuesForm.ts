import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Checkout } from '../useCheckout';

export function useValuesForm() {
  const { t } = useTranslation();
  const form = useFormContext<Checkout>();

  const cryptoType = form.watch('cryptoType');
  const fiatType = form.watch('fiatType');

  const calculateCryptoAmount = (numericValue: number) => {
    if (cryptoType === 'BTC') {
      if (fiatType === 'BRL') {
        // BRL → BTC: valor / taxa BRL/BTC
        const btcAmount = numericValue / form.getValues('btcRate');
        form.setValue('cryptoAmount', btcAmount.toFixed(8));
      } else {
        // USD → BTC: valor / taxa USD/BTC
        const btcAmount = numericValue / form.getValues('usdRate');
        form.setValue('cryptoAmount', btcAmount.toFixed(8));
      }
    } else {
      // USDT
      if (fiatType === 'BRL') {
        // BRL → USDT: valor / taxa BRL/USDT
        const usdtAmount = numericValue / form.getValues('usdtRate');
        form.setValue('cryptoAmount', usdtAmount.toFixed(2));
      } else {
        // USD → USDT: 1:1 (pois 1 USDT ≈ 1 USD)
        form.setValue('cryptoAmount', numericValue.toFixed(2));
      }
    }
  };

  const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      form.setValue('fiatAmount', '');
      form.setValue('cryptoAmount', '');
      return;
    }

    if (numericValue > 1000000) {
      numericValue = 1000000;
    }

    const formattedValue = new Intl.NumberFormat(
      fiatType === 'BRL' ? 'pt-BR' : 'en-US',
      {
        style: 'currency',
        currency: fiatType,
        minimumFractionDigits: 0,
      },
    ).format(numericValue);

    form.setValue('fiatAmount', formattedValue);
    calculateCryptoAmount(numericValue);
  };

  const toggleFiatType = () => {
    const newFiatType = fiatType === 'BRL' ? 'USD' : 'BRL';

    // Impede mudança para USD se crypto for USDT
    if (newFiatType === 'USD' && cryptoType === 'USDT') {
      toast.warning(t('checkout.usdt_to_usd_error'));
      return;
    }

    form.setValue('fiatType', newFiatType);
    form.setValue('fiatAmount', '');
    form.setValue('cryptoAmount', '');
  };

  const toggleCryptoType = () => {
    const newCryptoType = cryptoType === 'BTC' ? 'USDT' : 'BTC';

    // Impede mudança para USDT se fiat for USD
    if (newCryptoType === 'USDT' && fiatType === 'USD') {
      toast.warning(t('checkout.usdt_to_usd_error'));
      return;
    }

    form.setValue('cryptoType', newCryptoType);
    form.setValue('fiatAmount', '');
    form.setValue('cryptoAmount', '');
  };

  useEffect(() => {
    const fiatStr = form.getValues('fiatAmount');
    if (!fiatStr) return;

    const numericValue = parseInt(fiatStr.replace(/\D/g, ''), 10);
    if (isNaN(numericValue)) return;

    calculateCryptoAmount(numericValue);
  }, [cryptoType, fiatType, form]);

  return {
    t,
    form,
    handleFiatChange,
    toggleFiatType,
    toggleCryptoType,
  };
}

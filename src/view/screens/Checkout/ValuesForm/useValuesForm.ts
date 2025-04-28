// import { useUserLevel } from '@/view/hooks/useUserLevel';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Checkout } from '../useCheckout';

export function useValuesForm() {
  const { t } = useTranslation();
  const form = useFormContext<Checkout>();
  // const { restrictions, userLevelName } = useUserLevel();

  const cryptoType = form.watch('cryptoType');
  const fiatType = form.watch('fiatType');

  const calculateCryptoAmount = (numericValue: number) => {
    if (cryptoType === 'BITCOIN') {
      if (fiatType === 'BRL') {
        const btcAmount = numericValue / form.getValues('btcRate');
        form.setValue('cryptoAmount', btcAmount.toFixed(8));
      } else {
        const btcAmount = numericValue / form.getValues('usdRate');
        form.setValue('cryptoAmount', btcAmount.toFixed(8));
      }
    } else if (cryptoType === 'DEPIX') {
      if (fiatType === 'BRL') {
        form.setValue('cryptoAmount', numericValue.toString());
      } else {
        const depixAmount = numericValue / form.getValues('usdtRate');
        form.setValue('cryptoAmount', depixAmount.toFixed(2));
      }
    } else {
      if (fiatType === 'BRL') {
        const usdtAmount = numericValue / form.getValues('usdtRate');
        form.setValue('cryptoAmount', usdtAmount.toFixed(2));
      } else {
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

    // // Verificar limite do nível - agora apenas informamos, sem limitar
    // if (numericValue > restrictions.dailyLimit) {
    //   // Removemos a linha que limitava o valor
    //   // numericValue = restrictions.dailyLimit;
    //   toast.info(
    //     `Seu limite diário como ${userLevelName} é ${restrictions.dailyLimit.toLocaleString(
    //       'pt-BR',
    //       {
    //         style: 'currency',
    //         currency: 'BRL',
    //       },
    //     )}. Valores acima podem ser recusados pelo sistema bancário.`,
    //   );
    // }

    // Mantém o limite máximo global (não relacionado ao nível)
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
    let newCryptoType: 'BITCOIN' | 'DEPIX' | 'USDT';

    if (fiatType === 'USD') {
      // For USD, we only allow BITCOIN and DEPIX
      newCryptoType = cryptoType === 'BITCOIN' ? 'DEPIX' : 'BITCOIN';
    } else {
      // For BRL, cycle through BITCOIN -> USDT -> DEPIX
      if (cryptoType === 'BITCOIN') {
        newCryptoType = 'USDT';
      } else if (cryptoType === 'USDT') {
        newCryptoType = 'DEPIX';
      } else {
        newCryptoType = 'BITCOIN';
      }
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

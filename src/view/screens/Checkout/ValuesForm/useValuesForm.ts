import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkout } from '../useCheckout2';

export function useValuesForm() {
  const { t } = useTranslation();
  const form = useFormContext<Checkout>();

  const handleBrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      form.setValue('brlAmount', '');
      form.setValue('btcAmount', '');
      return;
    }

    if (numericValue > 5000) {
      numericValue = 5000;
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(numericValue);

    form.setValue('brlAmount', formattedValue);

    if (form.getValues('btcRate') > 0 && numericValue >= 0) {
      form.setValue(
        'btcAmount',
        (numericValue / form.getValues('btcRate')).toFixed(8),
      );
    }
  };

  return {
    t,
    form,
    handleBrlChange,
  };
}

import { t } from 'i18next';
import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../../domain/entities/payment.entity';

export function usePaymentOptions() {
  const form = useFormContext<GetCheckout>();

  const selectedPaymentLabel = form.watch('selectedPaymentLabel');

  const handlePaymentSelection = (
    method: 'MP' | 'EFI' | 'BTC' | 'OTHER',
    label: string,
  ) => {
    form.setValue('method', method);
    form.setValue('selectedPaymentLabel', label);

    switch (method) {
      case 'EFI':
        form.setValue(
          'paymentOption',
          label === t('paymentForm.creditCard') ? 'creditCard' : 'pix',
        );
        break;
      case 'MP':
        form.setValue(
          'paymentOption',
          label === `${t('paymentForm.creditCard')} - MP`
            ? 'creditCard'
            : 'pix',
        );
        break;
      case 'OTHER':
        form.setValue(
          'paymentOption',
          label === `${t('paymentForm.creditCard')}` ? 'creditCard' : 'pix',
        );
        break;
      case 'BTC':
        form.setValue('paymentOption', 'BTC');
        break;
    }
  };

  return {
    handlePaymentSelection,
    selectedPaymentLabel,
  };
}

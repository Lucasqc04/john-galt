import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetCheckout } from '../../../../domain/entities/payment.entity';

export function usePersonForm() {
  const { t } = useTranslation();
  const form = useFormContext<GetCheckout>();

  useEffect(() => {
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      const formData = JSON.parse(savedFormData);

      Object.keys(formData).forEach((key) => {
        form.setValue(key as keyof GetCheckout, formData[key]);
      });
    }
  }, [form]);

  const birthdayMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    e.target.value = value;
  };

  const phoneNumber = '5511919050416';
  const message = t('personForm.internationalSupportMessage');
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return {
    t,
    form,
    whatsappLink,
    birthdayMask,
  };
}

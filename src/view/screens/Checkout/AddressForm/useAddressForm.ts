import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { GetCheckout } from '../../../../domain/entities/payment.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function useAddressForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const form = useFormContext<GetCheckout>();
  const zipCode = form.watch('address.zipCode');

  const getAddressInfos = useCallback(
    async (cep: string) => {
      setLoading(true);
      try {
        const { result: ListedAddress } = await UseCases.address.list.execute({
          postalCode: cep,
        });

        if (ListedAddress.type === 'ERROR') {
          switch (ListedAddress.error.code) {
            case 'SERIALIZATION':
              alert('ERRO DE SERIALIZAÇÃO!');
              return;
            default:
              alert('ERRO DESCONHECIDO');
              return;
          }
        }

        const { city, state, street, uf, neighborhood } = ListedAddress.data;

        form.setValue('address.city', city);
        form.setValue('address.street', street);
        form.setValue('address.state', state);
        form.setValue('address.uf', uf);
        form.setValue('address.neighborhood', neighborhood);
      } finally {
        setLoading(false);
      }
    },
    [form],
  );

  function zipCodeMask(e: React.ChangeEvent<HTMLInputElement>) {
    const sanitizedValue = e.target.value.replace(/\D/g, '').slice(0, 8);
    form.setValue('address.zipCode', sanitizedValue);
  }

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      getAddressInfos(zipCode);
    }
  }, [zipCode, getAddressInfos]);

  return {
    t,
    form,
    loading,
    zipCodeMask,
  };
}

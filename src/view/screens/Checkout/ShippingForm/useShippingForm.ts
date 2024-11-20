import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../../domain/entities/payment.entity';
import { CalculatedShipping } from '../../../../domain/entities/Shipping.entity';
import { UseCases } from '../../../../domain/usecases/UseCases';

export function useShippingForm() {
  const [loading, setLoading] = useState<boolean>();
  const [shipping, setShipping] = useState<CalculatedShipping[]>();
  const form = useFormContext<GetCheckout>();

  const postalCode = form.getValues('address.zipCode');

  const shippingOptions = form.watch('shipping');

  const setShippingOption = useCallback(
    (option: CalculatedShipping) => {
      form.setValue('shipping', option);
    },
    [form],
  );

  const calculateShipping = useCallback(async () => {
    setLoading(true);
    try {
      const { result: CalculatedShipping } =
        await UseCases.shipping.calculate.execute({ postalCode });

      if (CalculatedShipping.type === 'ERROR') {
        switch (CalculatedShipping.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            return;
          default:
            alert('ERRO DESCONHECIDO');
            return;
        }
      }

      setShipping(CalculatedShipping.data);
    } finally {
      setLoading(false);
    }
  }, [postalCode]);

  useEffect(() => {
    calculateShipping();
  }, [postalCode, calculateShipping]);

  return {
    loading,
    shipping,
    shippingOptions: {
      value: shippingOptions,
      set: setShippingOption,
    },
  };
}

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetCheckout,
  Items,
  PaymentMethod,
} from '../../../domain/entities/payment.entity';
import { CalculatedShipping } from '../../../domain/entities/Shipping.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { useCartContext } from '../../context/CartContext';

export function useCheckout() {
  const { items, TotalValue, updateItemQuantity, remove, clear } =
    useCartContext();

  const form = useForm<GetCheckout>({
    mode: 'onChange',
    defaultValues: {
      payerEmail: '',
      firstName: '',
      lastName: '',
      identification: {
        type: 'CPF',
        number: '',
      },
      couponCode: '',
      address: {
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        zipCode: '',
        uf: '',
      },
      phone: {
        areaCode: '',
        number: '',
      },
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isValid },
  } = form;

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');
  const [currentStep, setCurrentStep] = useState(1);
  const [shipping, setShipping] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState<number>(TotalValue + shipping);
  const [shippingOptions, setShippingOptions] = useState<CalculatedShipping[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const zipCode = watch('address.zipCode');

  useEffect(() => {
    setTotal(TotalValue + shipping - discount);
  }, [TotalValue, shipping, discount]);

  const HandleWithPostalCode = useCallback(
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

        const { city, complement, state, street, uf } = ListedAddress.data;

        form.setValue('address.city', city);
        form.setValue('address.street', street);
        form.setValue('address.state', state);
        if (complement) {
          form.setValue('address.number', complement);
        }
        form.setValue('address.uf', uf);

        const { result: CalculatedShipping } =
          await UseCases.shipping.calculate.execute({
            postalCode: cep,
          });

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

        setShippingOptions(CalculatedShipping.data);
      } finally {
        setLoading(false);
      }
    },
    [form],
  );

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      HandleWithPostalCode(zipCode);
    }
  }, [zipCode, HandleWithPostalCode]);

  const onShippingSelect = (selectedShipping: CalculatedShipping) => {
    setShipping(parseFloat(selectedShipping.price));
  };

  const onSubmit = async (data: GetCheckout) => {
    setLoading(true);
    try {
      const shippingItem: Items = {
        id: 'FRETE',
        name: 'Frete',
        price: shipping,
        quantity: 1,
        imageUrl: '',
        categoryId: 'FRETE',
        description: 'FRETE DO PRODUTO',
      };

      const itemsWithShipping = [...items, shippingItem];

      const { result } = await UseCases.payment.create.execute({
        couponCode: data.couponCode,
        identification: data.identification,
        address: data.address,
        payerEmail: data.payerEmail,
        method: PaymentMethod.MP,
        firstName: data.firstName,
        lastName: data.lastName,
        items: itemsWithShipping,
        phone: data.phone,
      });

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO. POR FAVOR, ENTRE EM CONTATO');
            redirectToWhatsApp({ ...data, items });
            return;
          default:
            alert('ERRO AO PROCESSAR PAGAMENTO. POR FAVOR, ENTRE EM CONTATO');
            redirectToWhatsApp({ ...data, items });
            return;
        }
      }

      window.location.href = result.data.paymentLink;
    } finally {
      setLoading(false);
    }
  };

  function redirectToWhatsApp(data: GetCheckout) {
    const phoneNumber = '5511994458337';

    const itemsText =
      data.items && Array.isArray(data.items)
        ? data.items
            .map((item) => `${item.name}, na quantidade de ${item.quantity}`)
            .join('\n')
        : 'Nenhum item encontrado';

    const text = `Olá, meu nome é ${data.firstName} ${data.lastName}. Houve um erro no pagamento via site e gostaria de finalizar meu pedido.

    Endereço: ${data.address.street}, ${data.address.number}, ${data.address.complement} - ${data.address.city}/${data.address.state} - ${data.address.uf}
    Items: ${itemsText}
    Valor de Frete: ${shipping ?? 'não informado'}
    Total: ${total ?? 'não informado'}
    Cupom: ${data.couponCode ?? 'não informado'}`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    window.location.href = whatsappURL;
  }

  const applyCoupon = async () => {
    setLoading(true);
    try {
      const COUPON = {
        code: getValues('couponCode') || '',
      };

      const { result } = await UseCases.coupon.validate.execute({
        code: COUPON.code,
      });

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO, POR FAVOR ENTRAR EM CONTATO');
            return;
          case 'NOT_FOUND':
            setError('couponCode', {
              type: 'manual',
              message: 'Cupom inexistente',
            });
            return;
          default:
            alert('ERRO AO PROCESSAR CUPOM. ENTRE EM CONTATO.');
            return;
        }
      }

      const isActive = result.data.isActive;
      const minPurchaseValue = result.data.minPurchaseValue ?? 0;
      const maxDiscountValue = result.data.maxDiscountValue ?? Infinity;
      const discountValue = result.data.discountValue ?? 0;

      if (isActive && TotalValue >= minPurchaseValue) {
        const calculatedDiscount =
          result.data.discountType === 'percentage'
            ? Math.min(
                (TotalValue + shipping) * (discountValue / 100),
                maxDiscountValue,
              )
            : Math.min(discountValue, maxDiscountValue);

        setDiscount(calculatedDiscount);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    navigate,
    applyCoupon,
    steps: {
      current: currentStep,
      next: () => setCurrentStep(currentStep + 1),
      prev: () => setCurrentStep(currentStep - 1),
    },
    form: {
      provider: form,
      errors,
      register,
      submit: handleSubmit(onSubmit),
    },
    paymentMethod: {
      value: paymentMethod,
      set: setPaymentMethod,
    },
    cart: {
      total,
      items,
      subtotal: TotalValue,
      clear,
      remove,
      updateItemQuantity,
      discount: {
        value: discount,
      },
      shipping: {
        value: shipping,
        set: setShipping,
      },
      shippingOptions,
      onShippingSelect,
    },
    isValid,
  };
}

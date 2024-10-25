import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  GetCheckout,
  PaymentItems,
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
      email: '',
      name: '',
      surname: '',
      identification: {
        type: 'CPF',
        number: '',
      },
      coupon: '',
      address: {
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        zipCode: '',
      },
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
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
  const navigate = useNavigate();

  const zipCode = watch('address.zipCode');

  useEffect(() => {
    setTotal(TotalValue + shipping - discount);
  }, [TotalValue, shipping, discount]);

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      fetchShippingOptions(zipCode);
    }
  }, [zipCode]);

  const fetchShippingOptions = async (cep: string) => {
    try {
      const { result } = await UseCases.shipping.calculate.execute({
        postalCode: cep,
      });

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO!');
            return;
          default:
            alert('ERRO DESCONHECIDO');
            return;
        }
      }
      setShippingOptions(result.data);
    } catch {
      alert('ERRO AO CALCULAR O FRETE');
    }
  };

  const onShippingSelect = (selectedShipping: CalculatedShipping) => {
    setShipping(parseFloat(selectedShipping.price));
  };

  const onSubmit = async (data: GetCheckout) => {
    const shippingItem: PaymentItems = {
      id: 'FRETE',
      name: 'Frete',
      price: shipping,
      quantity: 1,
      imageUrl: '',
      category_id: 'FRETE',
    };

    const itemsWithShipping = [...items, shippingItem];

    const { result } = await UseCases.payment.create.execute({
      coupon: data.coupon,
      identification: data.identification,
      address: data.address,
      email: data.email,
      method: PaymentMethod.MP,
      name: data.name,
      surname: data.surname,
      items: itemsWithShipping,
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
  };

  function redirectToWhatsApp(data: GetCheckout) {
    const phoneNumber = '5511994458337';

    const itemsText =
      data.items && Array.isArray(data.items)
        ? data.items
            .map((item) => `${item.name}, na quantidade de ${item.quantity}`)
            .join('\n')
        : 'Nenhum item encontrado';

    const text = `Olá, meu nome é ${data.name} ${data.surname}. Houve um erro no pagamento via site e gostaria de finalizar meu pedido.

    Nome Completo: ${data.name} ${data.surname}
    Endereço: ${data.address.street}, ${data.address.number} - ${data.address.city}/${data.address.state}
    Items: ${itemsText}
    Valor de Frete: ${shipping ?? 'não informado'}
    Total: ${total ?? 'não informado'}
    Cupom: ${data.coupon ?? 'não informado'}`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

    window.location.href = whatsappURL;
  }

  const applyCoupon = async () => {
    const COUPON = {
      code: getValues('coupon') || '',
    };

    const { result } = await UseCases.coupon.validate.execute({
      code: COUPON.code,
    });

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          alert('ERRO DE SERIALIZAÇÃO, POR FAVOR ENTRAR EM CONTATO');
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
  };

  return {
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

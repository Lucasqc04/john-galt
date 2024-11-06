import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GetCheckout, Items } from '../../../domain/entities/payment.entity';
import { CalculatedShipping } from '../../../domain/entities/Shipping.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { useCartContext } from '../../context/CartContext';
import { ROUTES } from '../../routes/Routes';
import { redirectToWhatsApp } from '../../utils/RedirectToWhatsapp';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function useCheckout() {
  const { currentLang } = useCurrentLang();
  const {
    items,
    TotalValue,
    updateItemQuantity,
    remove,
    clear: clearCart,
  } = useCartContext();

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
        neighborhood: '',
      },
      phone: {
        areaCode: '',
        number: '',
      },
      brand: 'undefined',
      method: 'EFI',
      cardName: '',
      cardNumber: '',
      cvv: '',
      expiryDate: '',
      installments: [],
      birthday: '2004-01-01',
      selectInstallments: '1',
      items: [],
      total: 0,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
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
    if (items.length === 0) {
      navigate(ROUTES.cart.call(currentLang));
    }
  }, [items, currentLang, navigate]);

  useEffect(() => {
    setTotal(TotalValue + shipping - discount);
    setValue('total', TotalValue + shipping - discount);
  }, [TotalValue, shipping, discount, setValue]);

  useEffect(() => {
    const recalculateDiscount = async () => {
      const couponCode = getValues('couponCode');
      if (couponCode) {
        const { result } = await UseCases.coupon.validate.execute({
          code: couponCode,
        });

        if (result.type === 'SUCCESS') {
          const minPurchaseValue = result.data.minPurchaseValue ?? 0;
          const maxDiscountValue = result.data.maxDiscountValue ?? Infinity;
          const discountValue = result.data.discountValue ?? 0;

          if (TotalValue >= minPurchaseValue) {
            const recalculatedDiscount =
              result.data.discountType === 'percentage'
                ? Math.min(
                    (TotalValue + shipping) * (discountValue / 100),
                    maxDiscountValue,
                  )
                : Math.min(discountValue, maxDiscountValue);

            setDiscount(recalculatedDiscount);
          } else {
            setDiscount(0);
          }
        }
      }
    };

    recalculateDiscount();
    setTotal(TotalValue + shipping - discount);
    setValue('total', TotalValue + shipping - discount);
  }, [TotalValue, shipping, discount, getValues, setValue]);

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

        const { city, state, complement, street, uf, neighborhood } =
          ListedAddress.data;

        form.setValue('address.city', city);
        form.setValue('address.street', street);
        form.setValue('address.state', state);
        form.setValue('address.uf', uf);
        form.setValue('address.neighborhood', neighborhood);
        form.setValue('address.number', complement ?? '');

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
      if (shipping === 0) {
        alert('ESCOLHA UMA OPÇÃO DE FRETE');
        return;
      }

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

      const req: GetCheckout = {
        couponCode: data.couponCode,
        identification: data.identification,
        address: data.address,
        payerEmail: data.payerEmail,
        method: data.method,
        firstName: data.firstName,
        lastName: data.lastName,
        items: itemsWithShipping,
        phone: data.phone,
        brand: data.brand,
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        cvv: data.cvv,
        expiryDate: data.expiryDate,
        installments: data.installments,
        total: data.total,
        selectInstallments: data.selectInstallments,
        birthday: data.birthday,
      };

      const preValidationResult = GetCheckout.safeParse(req);

      if (!preValidationResult.success) {
        alert('PREENCHA TODAS AS INFORMAÇOES ANTES DE ENVIAR');
        return;
      }

      const { result } = await UseCases.payment.create.execute(req);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO. POR FAVOR, ENTRE EM CONTATO');
            redirectToWhatsApp({ ...data, items }, shipping, total);
            return;
          default:
            alert('ERRO AO PROCESSAR PAGAMENTO. POR FAVOR, ENTRE EM CONTATO');
            redirectToWhatsApp({ ...data, items }, shipping, total);
            return;
        }
      }

      if ('paymentLink' in result.data) {
        window.location.href = result.data.paymentLink;
        return;
      }

      if (result.data.data.status === 'approved') {
        clearCart();
        navigate(ROUTES.paymentStatus.success.call(currentLang));
      } else {
        navigate(ROUTES.paymentStatus.failure.call(currentLang));
      }
    } finally {
      setLoading(false);
    }
  };

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
      watch,
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

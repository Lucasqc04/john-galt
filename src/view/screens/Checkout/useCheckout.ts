import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetCheckout, Items } from '../../../domain/entities/payment.entity';
import { UseCases } from '../../../domain/usecases/UseCases';
import { useCartContext } from '../../context/CartContext';
import { ROUTES } from '../../routes/Routes';
import { redirectToWhatsApp } from '../../utils/RedirectToWhatsapp';
import { useCurrentLang } from '../../utils/useCurrentLang';

const LOCAL_STORAGE_KEY = 'checkoutFormState';

export function useCheckout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();
  const {
    items,
    clear: clearCart,
    updateItemQuantity,
    remove: removeCartItem,
  } = useCartContext();

  const form = useForm<GetCheckout>({
    mode: 'onChange',
    defaultValues: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'),
  });
  const navigate = useNavigate();

  const shippingPrice = form.watch('shipping.price');
  const discount = form.watch('discount');

  const updateTotal = useCallback(() => {
    const total = subtotal + Number(shippingPrice ?? 0) - (discount ?? 0);
    const totalRounded = Math.round(total * 100) / 100;

    form.setValue('total', totalRounded);

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...form.getValues(),
        couponCode: '',
        discount: 0,
      }),
    );
  }, [form, shippingPrice, subtotal, discount]);

  useEffect(() => {
    updateTotal();
  }, [updateTotal]);

  useEffect(() => {
    setSubtotal(
      items.reduce((total, item) => total + item.price * item.quantity, 0),
    );

    const recalculateDiscount = async () => {
      const couponCode = form.getValues('couponCode');
      const shipping = form.getValues('shipping');

      if (couponCode) {
        const { result } = await UseCases.coupon.validate.execute({
          code: couponCode,
        });

        if (result.type === 'SUCCESS') {
          const minPurchaseValue = result.data.minPurchaseValue ?? 0;
          const maxDiscountValue = result.data.maxDiscountValue ?? Infinity;
          const discountValue = result.data.discountValue ?? 0;

          if (subtotal >= minPurchaseValue) {
            const recalculatedDiscount =
              result.data.discountType === 'percentage'
                ? Math.min(
                    (subtotal + Number(shipping.price)) * (discountValue / 100),
                    maxDiscountValue,
                  )
                : Math.min(discountValue, maxDiscountValue);

            form.setValue('discount', recalculatedDiscount);
          } else {
            form.setValue('discount', 0);
          }
        }
      }
    };

    recalculateDiscount();
  }, [items, form, subtotal]);

  async function onSubmit(data: GetCheckout) {
    setLoading(true);
    const shipping = form.getValues('shipping');
    try {
      if (Number(shipping.price) === 0) {
        alert('ESCOLHA UMA OPÇÃO DE FRETE');
        return;
      }

      const shippingItem: Items = {
        id: `FRETE - ${shipping.id}`,
        name: `FRETE - ${shipping.company.name}`,
        price: Number(shipping.price),
        quantity: 1,
        imageUrl: shipping.company.picture,
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
        brand: data.brand ?? 'visa',
        cardName: data.cardName ?? '',
        cardNumber: data.cardNumber ?? '',
        cvv: data.cvv ?? '',
        expiryDate: data.expiryDate ?? '',
        installments: data.installments ?? [],
        total: data.total,
        selectInstallments: data.selectInstallments ?? '',
        birthday: data.birthday,
        paymentOption: data.paymentOption,
        selectedPaymentLabel: data.selectedPaymentLabel,
        shipping: data.shipping,
        discount: data.discount ?? 0,
      };

      const preValidationResult = GetCheckout.safeParse(req);

      if (!preValidationResult.success) {
        alert('PREENCHA TODAS AS INFORMAÇOES ANTES DE ENVIAR');
        console.log(preValidationResult.error.errors);
        return;
      }

      const { result } = await UseCases.payment.create.execute(req);

      if (result.type === 'ERROR') {
        switch (result.error.code) {
          case 'SERIALIZATION':
            alert('ERRO DE SERIALIZAÇÃO. POR FAVOR, ENTRE EM CONTATO');
            if (import.meta.env.VITE_NODE_ENV !== 'development') {
              redirectToWhatsApp(
                { ...data, items },
                Number(shipping.price),
                form.getValues('total'),
              );
            }
            return;
          default:
            alert('ERRO AO PROCESSAR PAGAMENTO. POR FAVOR, ENTRE EM CONTATO');
            if (import.meta.env.VITE_NODE_ENV !== 'development') {
              redirectToWhatsApp(
                { ...data, items },
                Number(shipping.price),
                form.getValues('total'),
              );
            }
            return;
        }
      }

      if ('paymentLink' in result.data) {
        window.location.href = result.data.paymentLink;
        return;
      }

      if ('checkoutLink' in result.data) {
        const linkToRedirect = result.data.checkoutLink;
        window.location.href = linkToRedirect;
        return;
      }

      if ('location' in result.data) {
        navigate(ROUTES.cart.pixPayment.call(currentLang), {
          state: {
            total: form.getValues('total'),
            creation: result.data.calendary.creation,
            expiration: result.data.calendary.expiration,
            qrCodeURL: result.data.location,
            pixCopyAndPaste: result.data.pixCopyAndPaste,
          },
        });
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
  }

  return {
    t,
    form,
    items,
    loading,
    subtotal,
    shippingPrice,
    navigate,
    removeCartItem,
    updateItemQuantity,
    onsubmit: form.handleSubmit(onSubmit),
    steps: {
      current: currentStep,
      next: () => setCurrentStep(currentStep + 1),
      prev: () => setCurrentStep(currentStep - 1),
    },
  };
}

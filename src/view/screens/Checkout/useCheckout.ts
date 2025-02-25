import { usecases } from '@/domain/usecases/UseCases';
import { ROUTES } from '@/view/routes/Routes';
import { useCurrentLang } from '@/view/utils/useCurrentLang';
import { toZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export type Checkout = {
  brlAmount: string;
  btcAmount: string;
  btcRate: number;
};

export type WalletType = 'liquid' | 'lightning' | 'onchain';
export type PaymentMethod = 'pix' | 'wise' | 'boleto';

export function useCheckout() {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransactionAllowed, setIsTransactionAllowed] = useState(true);

  // Estado para o tipo de carteira (wallet) e para o método de pagamento
  const [walletType, setWalletType] = useState<WalletType>('liquid');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  const form = useForm<Checkout>({
    mode: 'onChange',
    defaultValues: {
      brlAmount: '',
      btcAmount: '',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(import.meta.env.VITE_API_URL);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBitcoinRate = async () => {
      try {
        const { result } = await usecases.bitcoinRate.list.execute();

        if (result.type === 'ERROR') {
          return;
        }

        form.setValue('btcRate', result.data.bitcoin.brl);
      } catch (error) {
        console.error('Erro ao buscar taxa de Bitcoin:', error);
      }
    };

    fetchBitcoinRate();
  }, [form]);

  useEffect(() => {
    const timeZone = 'America/Sao_Paulo';
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = zonedTime.getHours();

    if (currentHour < 8 || currentHour >= 22) {
      setIsTransactionAllowed(false);
    }
  }, []);

  async function ValidateValues(data: Checkout) {
    if (!isTransactionAllowed) {
      toast.error(t('checkout.transaction_error'));
      return;
    }

    const numericValue = parseInt(
      form.getValues('brlAmount').replace(/\D/g, ''),
      10,
    );

    if (numericValue < 200) {
      toast.warning(t('checkout.min_value_error'));
      return;
    }

    // Se for menor que 700 e estiver usando onchain, exibe aviso
    if (numericValue < 700) {
      toast.info(t('checkout.wallet_error_below_700'));
    }

    // Se for acima de 5000 e o método de pagamento for PIX, exibe aviso
    if (numericValue > 5000) {
      toast.warning(t('checkout.payment_error_above_5000'));
    }

    // Se o valor for superior a 1.000.000, não permite prosseguir
    if (numericValue > 1000000) {
      toast.warning(t('checkout.amount_error_above_1m'));
      return;
    }

    localStorage.setItem('brlAmount', data.brlAmount);
    localStorage.setItem('btcAmount', data.btcAmount);
    navigate(ROUTES.buyCheckout.call(currentLang));
  }

  return {
    steps: {
      current: currentStep,
      next: () => setCurrentStep(currentStep + 1),
      prev: () => setCurrentStep(currentStep - 1),
    },
    form,
    ValidateValues,
    isTransactionAllowed,
    t,
    walletType,
    setWalletType,
    paymentMethod,
    setPaymentMethod,
  };
}

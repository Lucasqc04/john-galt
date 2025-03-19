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
  cryptoAmount: string;
  cryptoType: 'BTC' | 'USDT'; // Novo campo para armazenar o tipo
  btcRate: number;
  usdtRate: number;
};

export type WalletType = 'liquid' | 'lightning' | 'onchain';
export type PaymentMethod = 'pix' | 'wise' | 'boleto';

export function useCheckout() {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransactionAllowed, setIsTransactionAllowed] = useState(false);
  // atualizar aqui se o aflred estivar 24H
  const [isAlfred24h] = useState(true);
  // Estado para o tipo de carteira e método de pagamento
  const [walletType, setWalletType] = useState<WalletType>('liquid');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  const form = useForm<Checkout>({
    mode: 'onChange',
    defaultValues: {
      brlAmount: '',
      cryptoAmount: '',
      cryptoType: 'BTC',
      btcRate: 0,
      usdtRate: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetch(import.meta.env.VITE_API_URL);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCryptoRates = async () => {
      try {
        const { result } = await usecases.bitcoinRate.list.execute();
        if (result.type === 'ERROR') {
          return;
        }
        // Atualiza as taxas para BTC e USDT
        form.setValue('btcRate', result.data.bitcoin.brl);
        form.setValue('usdtRate', result.data.tether.brl);
      } catch (error) {
        console.error('Erro ao buscar taxas:', error);
      }
    };
    fetchCryptoRates();
  }, [form]);

  useEffect(() => {
    const timeZone = 'America/Sao_Paulo';
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = zonedTime.getHours();

    if (isAlfred24h || (currentHour >= 8 && currentHour < 22)) {
      setIsTransactionAllowed(true);
    } else {
      setIsTransactionAllowed(false);
    }
  }, [isAlfred24h]);

  async function ValidateValues(data: Checkout) {
    if (!isTransactionAllowed) {
      toast.error(t('checkout.transaction_error'));
      return;
    }

    const numericValue = parseInt(
      form.getValues('brlAmount').replace(/\D/g, ''),
      10,
    );

    if (!numericValue) {
      toast.warning(t('checkout.min_value_error'));
      return;
    }

    if (data.cryptoType === 'USDT') {
      // Valor mínimo para USDT é 550 BRL.
      if (numericValue < 500) {
        toast.warning(t('checkout.min_value_error_usdt'));
        return;
      }
    } else {
      // Valor mínimo para BTC é 200 BRL.
      if (numericValue < 200) {
        toast.warning(t('checkout.min_value_error'));
        return;
      }
      // Para valores acima de 5.000 BRL em BTC, exibe aviso para preenchimento do formulário de validação.
      if (numericValue > 5000) {
        toast.warning(t('checkout.payment_error_above_5000'));
      }
    }

    localStorage.setItem('brlAmount', data.brlAmount);
    localStorage.setItem('cryptoAmount', data.cryptoAmount);
    localStorage.setItem('cryptoType', data.cryptoType);
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
    isAlfred24h,
  };
}

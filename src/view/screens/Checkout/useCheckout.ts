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
};

export function useCheckout() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLang } = useCurrentLang();

  const [btcRate, setBtcRate] = useState(0);
  const [isTransactionAllowed, setIsTransactionAllowed] = useState(true);

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

        setBtcRate(result.data.bitcoin.brl);
        console.log(btcRate);
      } catch (error) {
        console.error('Erro ao buscar taxa de Bitcoin:', error);
      }
    };

    fetchBitcoinRate();
  }, [btcRate]);

  useEffect(() => {
    const timeZone = 'America/Sao_Paulo';
    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = zonedTime.getHours();

    if (currentHour < 8 || currentHour >= 22) {
      setIsTransactionAllowed(false);
    }
  }, []);

  const handleBrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10);

    if (isNaN(numericValue)) {
      form.setValue('brlAmount', '');
      form.setValue('btcAmount', '');
      return;
    }

    if (numericValue > 5000) {
      numericValue = 5000;
    }

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(numericValue);

    form.setValue('brlAmount', formattedValue);

    if (btcRate > 0 && numericValue >= 0) {
      form.setValue('btcAmount', (numericValue / btcRate).toFixed(8));
    }
  };

  async function onSubmit(data: Checkout) {
    if (!isTransactionAllowed) {
      toast.error(t('checkout.transaction_error'));
      return;
    }

    const numericValue = parseInt(
      form.getValues('brlAmount').replace(/\D/g, ''),
      10,
    );

    if (numericValue >= 700 && numericValue <= 5000) {
      localStorage.setItem('brlAmount', data.brlAmount);
      localStorage.setItem('btcAmount', data.btcAmount);
      navigate(ROUTES.buyCheckout.call(currentLang));
    } else {
      toast.warning(t('checkout.amount_error'));
    }
  }

  const form = useForm<Checkout>({
    mode: 'onChange',
    defaultValues: {
      brlAmount: '',
      btcAmount: '',
    },
  });

  return {
    t,
    form,
    handleBrlChange,
    onSubmit,
    isTransactionAllowed,
  };
}

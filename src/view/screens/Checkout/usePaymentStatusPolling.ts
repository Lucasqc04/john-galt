import { ROUTES } from '@/view/routes/Routes';
import { useCurrentLang } from '@/view/utils/useCurrentLang';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const usePaymentStatusPolling = () => {
  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);

  const pollingInterval = 10000;
  const maxPollingTime = 300000;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);

  const verifyPaymentStatus = useCallback(async () => {
    const transaction = localStorage.getItem('transactionId');
    if (!transaction) {
      toast.error(t('buycheckout.transactionNumberError'));
      return;
    }
    setIsLoadingPayment(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/deposit-status?transactionId=${transaction}`,
      );
      const status = response.data.status;

      if (status === 'paid') {
        navigate(ROUTES.paymentAlfredStatus.success.call(currentLang));
        clearInterval(timerRef.current!);
      } else {
        toast.warn(t('buycheckout.paymentNotConfirmed'));
      }
    } catch (error) {
      console.error('Erro ao verificar o status do pagamento:', error);
      toast.warn(t('buycheckout.paymentNotConfirmed'));
    } finally {
      setIsLoadingPayment(false);
    }
  }, [currentLang, navigate]);

  useEffect(() => {
    startTime.current = Date.now();

    timerRef.current = setInterval(() => {
      if (Date.now() - startTime.current! > maxPollingTime) {
        clearInterval(timerRef.current!);
        toast.warn(t('buycheckout.paymentTimeoutExceeded'));
        return;
      }
      verifyPaymentStatus();
    }, pollingInterval);

    return () => clearInterval(timerRef.current!);
  }, [verifyPaymentStatus]);

  return {
    isLoadingPayment,
    verifyPaymentStatus,
  };
};

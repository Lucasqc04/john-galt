import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Onchain from '../../assets/bitcoin.svg';
import Liquid from '../../assets/lbtc.svg';
import Lightning from '../../assets/lightning.svg';
import { ROUTES } from '../../routes/Routes';
import { useCurrentLang } from '../../utils/useCurrentLang';

export function useCheckout() {
  const [network, setNetwork] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(240);
  const [isTransactionTimedOut, setIsTransactionTimedOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [coldWallet, setColdWallet] = useState<string>('');
  const [transactionNumber, setTransactionNumber] = useState<string>('');
  const [cupom, setCupom] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMethod, setIsDropdownOpenMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'PIX' | 'Cartão de Crédito' | 'Boleto Bancário'
  >('PIX');
  const [pixKey, setPixKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brlAmount, setBrlAmount] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [acceptFees, setAcceptFees] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmDate, setconfirmDate] = useState(false);

  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const { t } = useTranslation();

  useEffect(() => {
    const storedBrl = localStorage.getItem('brlAmount');
    const storedBtc = localStorage.getItem('btcAmount');
    if (storedBrl && storedBtc) {
      setBrlAmount(storedBrl);
      setBtcAmount(storedBtc);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const selectNetwork = (networkName: string) => {
    setNetwork(networkName);
    setIsDropdownOpen(false);
  };

  const toggleDropdownMethod = () => {
    setIsDropdownOpenMethod((prevState) => !prevState);
  };

  const selectPaymentMethod = (method: 'PIX') => {
    setPaymentMethod(method);
    setIsDropdownOpenMethod(false);
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!coldWallet) {
      newErrors.coldWallet = t('buycheckout.coldWalletError');
    } else {
      switch (network) {
        case 'Onchain':
          if (
            !/^(1|3)[a-km-zA-HJ-NP-Z0-9]{25,34}$|^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(
              coldWallet,
            )
          ) {
            newErrors.coldWallet = t(
              'buycheckout.invalidColdWalletErrorOnchain',
            );
          }
          break;
        case 'Liquid':
          if (
            !/^VJL[a-km-zA-HJ-NP-Z0-9]{43,}$/i.test(coldWallet) &&
            !/^ex1[a-z0-9]{39,59}$/i.test(coldWallet) &&
            !/^CT[a-km-zA-HJ-NP-Z0-9]{40,64}$/i.test(coldWallet)
          ) {
            newErrors.coldWallet = t(
              'buycheckout.invalidColdWalletErrorLiquid',
            );
          }
          break;
        case 'Lightning':
          if (!/^lnbc[0-9]{1,}[a-zA-Z0-9]+$/.test(coldWallet)) {
            newErrors.coldWallet = t(
              'buycheckout.invalidColdWalletErrorLightning',
            );
          }
          break;
        default:
          newErrors.coldWallet = t('buycheckout.invalidColdWalletError');
          break;
      }
    }

    if (!transactionNumber) {
      newErrors.transactionNumber = t('buycheckout.transactionNumberError');
    } else if (!/^\d{9,15}$/.test(transactionNumber)) {
      newErrors.transactionNumber = t(
        'buycheckout.invalidTransactionNumberError',
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const networks = [
    { name: 'Onchain', icon: Onchain },
    { name: 'Liquid', icon: Liquid },
    { name: 'Lightning', icon: Lightning },
  ];

  const handleProcessPayment = async () => {
    if (!acceptFees || !acceptTerms || !confirmDate) {
      toast.warning(t('buycheckout.termsAndFeesAlert'));
      return;
    }

    if (!network) {
      toast.warning(t('buycheckout.networkSelectionAlert'));
      return;
    }

    if (!validateFields()) return;

    setIsLoading(true);

    timeoutRef.current = setTimeout(
      () => {
        setIsTransactionTimedOut(true);
        setIsLoading(false);
      },
      4 * 60 * 1000,
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/deposit`,
        {
          valorBRL: parseFloat(brlAmount.replace(/\D/g, '')),
          valorBTC: parseFloat(btcAmount),
          paymentMethod: 'PIX',
          network: network,
          telefone: transactionNumber,
          coldWallet: coldWallet,
          cupom: cupom,
        },
      );

      const pixKey = response.data.response.qrCopyPaste;
      setPixKey(pixKey);
      setTimeLeft(240);
      setIsLoading(false);

      const transactionId = response.data.response.id;
      localStorage.setItem('transactionId', transactionId);
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast.error(t('buycheckout.paymentError'));
      setIsLoading(false);
    }
  };

  const verifyPaymentStatus = async () => {
    const transaction = localStorage.getItem('transactionId');
    if (!transaction) {
      toast.error(t('buycheckout.transactionNumberError'));
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/deposit-status?transactionId=${transaction}`,
      );

      const status = response.data.response.status;
      if (status !== 'paid') {
        toast.warn(t('buycheckout.paymentNotConfirmed'));
      } else {
        navigate(ROUTES.paymentAlfredStatus.success.call(currentLang));
      }
    } catch (error) {
      console.error('Erro ao verificar o status do pagamento:', error);
      toast.warn(t('buycheckout.paymentNotConfirmed'));
    }
  };

  const copyToClipboard = () => {
    if (pixKey) {
      navigator.clipboard.writeText(pixKey);
      toast.success(t('buycheckout.pixKeyCopied'));
    }
  };
  useEffect(() => {
    if (!pixKey) return;

    if (timeLeft <= 0) {
      setIsTransactionTimedOut(true);
      navigate(ROUTES.paymentAlfredStatus.failure.call(currentLang));
      return;
    }

    const timer = setTimeout(
      () => setTimeLeft((prevTime) => prevTime - 1),
      1000,
    );
    return () => clearTimeout(timer);
  }, [timeLeft, navigate, currentLang, pixKey]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const checkCouponValidity = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/coupons/is-valid`,
        { code: cupom.trim() },
      );
      const coupon = response.data;

      if (!coupon.isActive) {
        toast.warning(t('buycheckout.couponInactive'));
        return;
      }

      toast.success(t('buycheckout.couponValid'));
    } catch (error) {
      console.error('Erro ao verificar o cupom:', error);
      toast.error(t('buycheckout.couponCheckError'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    network,
    timeLeft,
    isTransactionTimedOut,
    coldWallet,
    transactionNumber,
    cupom,
    isDropdownOpen,
    isDropdownOpenMethod,
    paymentMethod,
    pixKey,
    isLoading,
    errors,
    brlAmount,
    btcAmount,
    acceptFees,
    acceptTerms,
    networks,
    currentLang,
    confirmDate,
    toggleDropdown,
    selectNetwork,
    toggleDropdownMethod,
    selectPaymentMethod,
    handleProcessPayment,
    copyToClipboard,
    checkCouponValidity,
    setColdWallet,
    setAcceptTerms,
    setAcceptFees,
    setCupom,
    setTransactionNumber,
    verifyPaymentStatus,
    setconfirmDate,
  };
}

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Onchain from '../../../assets/bitcoin.svg';
import Liquid from '../../../assets/lbtc.svg';
import Lightning from '../../../assets/lightning.svg';
import Polygon from '../../../assets/polygon.png';
import { ROUTES } from '../../../routes/Routes';
import { useCurrentLang } from '../../../utils/useCurrentLang';

export function useDataForm() {
  const [network, setNetwork] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(150);
  const [isTransactionTimedOut, setIsTransactionTimedOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [coldWallet, setColdWallet] = useState<string>('');
  const [transactionNumber, setTransactionNumber] = useState<string>('');
  const [cupom, setCupom] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenMethod, setIsDropdownOpenMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'PIX' | 'TICKET' | 'WISE'
  >();
  const [pixKey, setPixKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [brlAmount, setBrlAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [acceptFees, setAcceptFees] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [alfredFeePercentage, setAlfredFeePercentage] = useState(5);

  const navigate = useNavigate();
  const { currentLang } = useCurrentLang();
  const { t } = useTranslation();

  useEffect(() => {
    const storedBrl = localStorage.getItem('brlAmount');
    const storedCrypto = localStorage.getItem('cryptoAmount');
    const storedCryptoType = localStorage.getItem('cryptoType');
    if (storedBrl && storedCrypto && storedCryptoType) {
      setBrlAmount(storedBrl);
      setCryptoAmount(storedCrypto);
      setCryptoType(storedCryptoType);
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

  const selectPaymentMethod = (method: 'PIX' | 'WISE' | 'TICKET') => {
    setPaymentMethod(method);
    setIsDropdownOpenMethod(false);
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!coldWallet) {
      newErrors.coldWallet = t('buycheckout.coldWalletError');
    } else {
      if (cryptoType.toUpperCase() === 'USDT') {
        if (network === 'Liquid') {
          if (
            !/^VJL[a-km-zA-HJ-NP-Z0-9]{43,}$/i.test(coldWallet) &&
            !/^ex1[a-z0-9]{39,59}$/i.test(coldWallet) &&
            !/^CT[a-km-zA-HJ-NP-Z0-9]{40,64}$/i.test(coldWallet)
          ) {
            newErrors.coldWallet = t(
              'buycheckout.invalidColdWalletErrorLiquid',
            );
          }
        } else if (network === 'Polygon') {
          if (!/^0x[a-fA-F0-9]{40}$/.test(coldWallet)) {
            newErrors.coldWallet = t(
              'buycheckout.invalidColdWalletErrorPolygon',
            );
          }
        } else {
          newErrors.coldWallet = t('buycheckout.invalidNetworkForUSDT');
        }
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
            if (
              !/^lnbc[0-9]{1,}[a-zA-Z0-9]+$/.test(coldWallet) &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(coldWallet)
            ) {
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

  const networks =
    cryptoType.toUpperCase() === 'USDT'
      ? [
          { name: 'Liquid', icon: Liquid },
          { name: 'Polygon', icon: Polygon },
        ]
      : [
          { name: 'Onchain', icon: Onchain },
          { name: 'Liquid', icon: Liquid },
          { name: 'Lightning', icon: Lightning },
        ];

  const handleProcessPayment = async () => {
    if (!acceptFees || !acceptTerms) {
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
      const valorBRL = parseFloat(brlAmount.replace(/\D/g, ''));
      const valorToSend = valorBRL === 100000 ? 1000 : valorBRL;

      if (cryptoType.toUpperCase() === 'USDT') {
        const whatsappNumber = '5511993439032';

        let PaymentMethodFormatted = '';

        if (paymentMethod === 'TICKET') {
          PaymentMethodFormatted = 'Boleto Bancário';
        } else if (paymentMethod === 'WISE') {
          PaymentMethodFormatted = 'Wise';
        }

        if (paymentMethod === 'TICKET' || paymentMethod === 'WISE') {
          const message = `Olá! Aqui estão os detalhes do pedido :\n\nValor BRL: ${brlAmount}\n${cryptoType}: ${cryptoAmount}\nRede: ${network}\nCold Wallet: ${coldWallet}\nMétodo: ${PaymentMethodFormatted}\nTelefone: ${transactionNumber}\nCupom: ${cupom}`;

          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          window.location.href = whatsappLink;
          return;
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/deposit`,
        {
          valorBRL: valorToSend,
          valorBTC: parseFloat(cryptoAmount),
          paymentMethod: paymentMethod,
          network: network,
          telefone: transactionNumber,
          coldWallet: coldWallet,
          cupom: cupom,
          cryptoType: cryptoType.toUpperCase() === 'USDT' ? 'USDT' : 'BITCOIN',
        },
      );

      if (paymentMethod === 'WISE') {
        const whatsappNumber = '5511993439032';
        const message = `Olá! Aqui estão os detalhes do pedido Wise:\n\n Valor BRL: ${brlAmount} \n ${cryptoType}: ${cryptoAmount}\n Rede: ${network}\n Cold Wallet: ${coldWallet} \n Método: Wise\n Telefone: ${transactionNumber}\n Cupom: ${cupom}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappLink;
        return;
      }

      if (paymentMethod === 'TICKET') {
        const whatsappNumber = '5511993439032';
        const message = `Olá! Aqui estão os detalhes do pedido Boleto Bancário:\n\n Valor BRL: ${brlAmount} \n ${cryptoType}: ${cryptoAmount}\n Rede: ${network}\n Cold Wallet: ${coldWallet} \n Método: Boleto Bancário\n Telefone: ${transactionNumber}\n Cupom: ${cupom}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappLink;
        return;
      }

      const pixKey = response.data.response?.qrCopyPaste;
      const status = response.data.response?.status;
      const transactionId = response.data.response?.id;

      if (transactionId) {
        localStorage.setItem('transactionId', transactionId);
      }
      if (pixKey) {
        localStorage.setItem('pixKey', pixKey);
        setPixKey(pixKey);
      }
      if (status) {
        localStorage.setItem('status', status);
      }

      setTimeLeft(150);
      setIsLoading(false);

      if (pixKey) {
        navigate(ROUTES.checkoutPix.call(currentLang));
      }

      if (status === 'depix_sent' || status === 'paid') {
        toast.success(t('Pagamento confirmado'));
        navigate(ROUTES.paymentAlfredStatus.success.call(currentLang));
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast.error(t('buycheckout.paymentError'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pixKey) {
      localStorage.setItem('pixKey', pixKey);
    }
  }, [pixKey]);

  useEffect(() => {
    const storedPixKey = localStorage.getItem('pixKey');
    if (storedPixKey) {
      setPixKey(storedPixKey);
    }
  }, []);

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
    if (!cupom.trim()) {
      setErrors((prev) => ({ ...prev, cupom: '' }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/coupons/is-valid`,
        { code: cupom.trim() },
      );
      const coupon = response.data;

      if (!coupon.isActive) {
        setErrors((prev) => ({
          ...prev,
          cupom: t('buycheckout.couponInactive'),
        }));
        setCupom('');
        toast.error(t('buycheckout.couponInactive'));
        return;
      }

      if (coupon.discountType === 'percentage') {
        setAlfredFeePercentage(() => {
          console.log('Novo valor do Alfred Fee:', coupon.discountValue);
          return coupon.discountValue;
        });
      }

      setErrors((prev) => ({ ...prev, cupom: '' }));
      toast.success(t('buycheckout.couponValid'));
    } catch (error) {
      console.error('Erro ao verificar o cupom:', error);
      setErrors((prev) => ({
        ...prev,
        cupom: t('buycheckout.couponCheckError'),
      }));
      setCupom('');
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
    cryptoAmount,
    cryptoType,
    acceptFees,
    acceptTerms,
    networks,
    currentLang,
    alfredFeePercentage,
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
    setPaymentMethod,
    validateFields,
  };
}

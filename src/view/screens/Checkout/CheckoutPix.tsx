import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import JohnGaltQr from '../../assets/logo/Logo.png';
import { useDataForm } from './DataForm/useDataForm';
import { usePaymentStatusPolling } from './usePaymentStatusPolling';

export function CheckoutPix() {
  const { timeLeft, pixKey } = useDataForm();
  const { isLoadingPayment, verifyPaymentStatus } = usePaymentStatusPolling();
  const [cryptoType, setCryptoType] = useState('');
  const [isVipTransaction, setIsVipTransaction] = useState(false);

  useEffect(() => {
    const storedCryptoType = localStorage.getItem('cryptoType');
    if (storedCryptoType) {
      setCryptoType(storedCryptoType);
    }

    // Verificar se é uma transação VIP com base no pixKey
    const vipFlag = localStorage.getItem('isVipTransaction');
    if (vipFlag === 'true' && pixKey?.includes('vip@depix.info')) {
      setIsVipTransaction(true);
    } else {
      setIsVipTransaction(false);
    }
  }, [pixKey]);

  // Função para copiar a chave PIX
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(pixKey ?? '');
    toast.success(t('buycheckout.copyPixKey'));
  };

  return (
    <div className="flex flex-col items-center pt-4">
      <h3 className="text-red-600 text-3xl font-semibold mb-2">
        {t('buycheckout.attention')}
      </h3>

      {isVipTransaction && (
        <div className="bg-green-700 text-white p-3 rounded-lg mb-4">
          Usuário VIP - Pagamento Prioritário
          <div className="text-xs mt-1">
            Não há confirmação automática de pagamento para usuários VIP.
          </div>
        </div>
      )}

      <p className="text-lg text-center text-gray-100 mb-4">
        {t('buycheckout.instruction')}
      </p>
      <p className="text-center text-red-600">
        {t('buycheckout.timeRemaining')}: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 && '0'}
        {timeLeft % 60} {t('buycheckout.minutes')}
      </p>

      {!isVipTransaction && (
        <button
          onClick={verifyPaymentStatus}
          disabled={isLoadingPayment}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-md mb-8"
        >
          {isLoadingPayment
            ? t('buycheckout.verifying')
            : t('buycheckout.makePayment')}
        </button>
      )}

      <p className="text-xl text-center text-white">
        {t('buycheckout.scanQRCode')}
      </p>
      <div className="relative flex justify-center items-center p-4">
        <div className="relative bg-white rounded-lg shadow-lg p-2 overflow-hidden">
          {/* Container com posição relativa que contém o QR Code */}
          <div className="relative">
            <QRCodeSVG
              value={pixKey ?? ''}
              size={280}
              level="H" // Maior nível de correção de erro
              marginSize={10}
              className="z-0"
            />

            {/* Sobreposição semi-transparente com a mensagem que fica integrada ao QR Code */}
            <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none">
              {/* Faixa superior semi-transparente com texto */}
              <div className="w-full bg-red-600 bg-opacity-80 py-1 px-1 text-center">
                <span className="text-white font-bold text-xs">
                  {t('buycheckout.bitcoinPurchaseWarning')}{' '}
                  {cryptoType === 'BITCOIN' ? 'Bitcoin' : cryptoType}
                </span>
              </div>

              {/* Logo centralizada no meio do QR */}
              <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-lg">
                <img
                  src={JohnGaltQr}
                  alt={t('buycheckout.alfredLogoAlt')}
                  className="w-[60px] h-[60px] object-contain"
                />
              </div>

              {/* Faixa inferior semi-transparente com texto */}
              <div className="w-full bg-gray-900 bg-opacity-80 py-1 px-1 text-center">
                <span className="text-white font-bold text-xs">
                  JOHN GALT - COMPRA DE {cryptoType}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <textarea
        value={pixKey ?? ''}
        readOnly
        className="border px-4 py-3 rounded-2xl text-base text-white bg-[#000E16] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden"
        rows={4}
      />

      <button
        onClick={handleCopyToClipboard}
        className="pt-4 px-6 py-3 bg-[#ff007a] text-white rounded-3xl font-bold m-3 mb-[5%]"
      >
        {t('buycheckout.copyPixKey')}
      </button>
    </div>
  );
}

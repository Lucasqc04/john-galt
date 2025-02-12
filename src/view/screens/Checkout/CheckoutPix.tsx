import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import AlfredQr from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';
import Qrcode from '../../assets/qrcode100k.jpeg';
import { useDataForm } from './DataForm/useDataForm';
import { usePaymentStatusPolling } from './usePaymentStatusPolling';

export function CheckoutPix() {
  const { timeLeft, pixKey } = useDataForm();
  const { isLoadingPayment, verifyPaymentStatus } = usePaymentStatusPolling();

  // Verifica se o valor é igual a R$ 100.000
  const is100k =
    parseInt(
      localStorage.getItem('brlAmount')?.replace(/\D/g, '') || '0',
      10,
    ) === 100000;

  // Valor específico do PIX para R$ 100.000
  const pixValue100k =
    '00020126360014BR.GOV.BCB.PIX0114vip@depix.info5204000053039865409100000.005802BR5901N6001C62070503***63042A76';

  // Função para copiar a chave PIX correta
  const handleCopyToClipboard = () => {
    const textToCopy = is100k ? pixValue100k : (pixKey ?? '');
    navigator.clipboard.writeText(textToCopy);
    toast.success(t('buycheckout.pixKeyCopied'));
  };

  return (
    <div className="flex flex-col items-center pt-4">
      <h3 className="text-red-600 text-3xl font-semibold mb-2">Atenção:</h3>
      <p className="text-lg text-center text-gray-100 mb-4">
        Para concluir sua transação, clique no botão abaixo após realizar o
        pagamento.
      </p>
      <p className="text-center text-red-600">
        {t('buycheckout.timeRemaining')}: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 && '0'}
        {timeLeft % 60} {t('buycheckout.minutes')}
      </p>
      <button
        onClick={verifyPaymentStatus}
        disabled={isLoadingPayment}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-md mb-8"
      >
        {isLoadingPayment ? 'Verificando...' : t('buycheckout.makePayment')}
      </button>

      <p className="text-xl text-center text-white">
        {t('buycheckout.scanQRCode')}
      </p>
      <div className="relative flex justify-center items-center p-4">
        {/* Exibe o QR Code específico para R$ 100.000 ou o QR Code dinâmico */}
        {is100k ? (
          <img src={Qrcode} alt="QR Code para R$ 100.000" className="w-[50%]" />
        ) : (
          <>
            <QRCodeSVG
              value={pixKey ?? ''}
              size={256}
              level="H"
              marginSize={10}
              className="relative"
            />
            <div className="absolute">
              <img
                src={AlfredQr}
                alt="Logo-alfred"
                className="w-full h-40 rounded-full"
              />
            </div>
          </>
        )}
      </div>

      {/* Exibe o valor específico do PIX para R$ 100.000 ou a chave PIX normal */}
      {is100k ? (
        <textarea
          value={pixValue100k}
          readOnly
          className="border px-4 py-3 rounded-2xl text-base text-white bg-[#000E16] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden"
          rows={4}
        />
      ) : (
        <textarea
          value={pixKey ?? ''}
          readOnly
          className="border px-4 py-3 rounded-2xl text-base text-white bg-[#000E16] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden"
          rows={4}
        />
      )}

      <button
        onClick={handleCopyToClipboard} // Usa a nova função de cópia
        className="pt-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold m-3 mb-[5%]"
      >
        {t('buycheckout.copyPixKey')}
      </button>
    </div>
  );
}

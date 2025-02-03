import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import AlfredQr from '../../assets/_DIY SEC LAB - Apresentação Comercial (1).png';
import { useCheckout } from './useChekout';

export function CheckoutPix() {
  const { pixKey, timeLeft, copyToClipboard, verifyPaymentStatus } =
    useCheckout();

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
        onClick={() => verifyPaymentStatus()}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 shadow-md mb-8"
      >
        {t('buycheckout.makePayment')}
      </button>

      <p className="text-xl text-center text-white">
        {t('buycheckout.scanQRCode')}
      </p>
      <div className="relative flex justify-center items-center p-4">
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
      </div>

      <textarea
        value={pixKey ?? ''}
        readOnly
        className="border px-4 py-3 rounded-2xl text-base text-white bg-[#000E16] w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl overflow-hidden"
        rows={4}
      />

      <button
        onClick={copyToClipboard}
        className="pt-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold m-3 mb-[5%]"
      >
        {t('buycheckout.copyPixKey')}
      </button>
    </div>
  );
}

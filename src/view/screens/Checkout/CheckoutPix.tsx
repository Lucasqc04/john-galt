import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import AlfredQr from '../../assets/Alfred Mão fechada (1).png';
import { useCheckout } from './useChekout';

export function CheckoutPix() {
  const { pixKey, copyToClipboard, verifyPaymentStatus } = useCheckout();

  console.log(`Pix ${pixKey}`);
  return (
    <div className="flex flex-col items-center pt-4">
      {/* <p className="text-center text-red-600">
      {t('buycheckout.timeRemaining')}: {Math.floor(timeLeft / 60)}:
      {timeLeft % 60 < 10 && '0'}
      {timeLeft % 60} {t('buycheckout.minutes')}
    </p> */}

      <h3 className="text-red-600 text-3xl font-semibold mb-2">Atenção:</h3>
      <p className="text-lg text-center text-gray-100 mb-4">
        Para concluir sua transação, clique no botão abaixo após realizar o
        pagamento.
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
          <img src={AlfredQr} alt="Logo" className="w-40 h-40 rounded-full" />
        </div>
      </div>

      <textarea
        value={pixKey ?? ''}
        readOnly
        className="border px-4 py-4 rounded-3xl text-lg text-white bg-[#B9B8B8] w-full overflow-hidden"
        rows={8}
      />

      <button
        onClick={copyToClipboard}
        className="pt-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold m-3"
      >
        {t('buycheckout.copyPixKey')}
      </button>
    </div>
  );
}

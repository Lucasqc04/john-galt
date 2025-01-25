import { t } from 'i18next';
import { QRCodeSVG } from 'qrcode.react';
import Alfred from '../../assets/AlfredComercial.png';
import { useCheckout } from './useChekout';

export function PixKey() {
  const { pixKey, timeLeft } = useCheckout();

  return (
    <div className="flex flex-col items-center pt-4">
      <p className="text-center text-red-600">
        {t('buycheckout.timeRemaining')}: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? '0' : ''}
        {timeLeft % 60} {t('buycheckout.minutes')}
      </p>

      <p className="text-xl text-center text-black dark:text-white mb-4">
        {t('buycheckout.scanQRCode')}
      </p>

      {pixKey && <QRCodeSVG value={pixKey} size={256} />}

      <textarea
        value={pixKey ?? ''}
        readOnly
        className="border px-4 py-3 rounded-3xl text-lg text-black dark:text-white bg-slate-100 dark:bg-[#B9B8B8] w-full mt-4"
        rows={6}
      />

      <button className="mt-4 px-6 py-3 bg-[#F39200] text-white rounded-3xl font-bold">
        {t('buycheckout.copyPixKey')}
      </button>
      <div className="hidden sm:block absolute right-[20%] top-[30%] transform translate-x-1/2 translate-y-1/2 w-[50%]">
        <img src={Alfred} alt="" />
      </div>
    </div>
  );
}

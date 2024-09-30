import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePayment } from './usePayment';

const getCardFlag = (cardNumber: string) => {
  const bin = cardNumber.substring(0, 6);

  if (/^4/.test(bin)) return 'visa';

  if (/^5[1-5]/.test(bin)) return 'mastercard';

  if (/^4011|4312|4389|4514|4576|5041|5066|5090|6277|6363/.test(bin))
    return 'elo';

  if (/^3[47]/.test(bin)) return 'amex';

  if (/^606282|3841/.test(bin)) return 'hipercard';

  return 'default';
};

export function PaymentForm() {
  const { t } = useTranslation();
  const { paymentData, handleInputChange, submitPayment } = usePayment();
  const [cardFlag, setCardFlag] = useState('default');

  const handleCardNumberChange = (value: string) => {
    handleInputChange('cardNumber', value);

    const flag = getCardFlag(value);
    setCardFlag(flag);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitPayment();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto"
    >
      <div className="flex flex-row items-center justify-between mb-3">
        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
          type="text"
          name="cardName"
          id="cardName"
          placeholder={t('cardNamePlaceholder')}
          value={paymentData.cardName}
          onChange={(e) => handleInputChange('cardName', e.target.value)}
          required
        />
        <div className="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
          {cardFlag === 'visa' && (
            <img
              src="src/view/assets/images/logocard/visa-logo.png"
              alt={t('visa')}
              className="h-7"
            />
          )}
          {cardFlag === 'mastercard' && (
            <img
              src="src/view/assets/images/logocard/mastercard-logo.png"
              alt={t('mastercard')}
              className="h-7"
            />
          )}
          {cardFlag === 'elo' && (
            <img
              src="src/view/assets/images/logocard/elo-logo.png"
              alt={t('elo')}
              className="h-7"
            />
          )}
          {cardFlag === 'amex' && (
            <img
              src="src/view/assets/images/logocard/amex-logo.svg"
              alt={t('amex')}
              className="h-7"
            />
          )}
          {cardFlag === 'hipercard' && (
            <img
              src="src/view/assets/images/logocard/hipercard-logo.png"
              alt={t('hipercard')}
              className="h-7"
            />
          )}
          {cardFlag === 'default' && (
            <svg
              className="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ff9800"
                d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
              ></path>
              <path
                fill="#d50000"
                d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
              ></path>
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              ></path>
            </svg>
          )}
        </div>
      </div>

      <input
        className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
        type="text"
        name="cardNumber"
        id="cardNumber"
        placeholder={t('cardNumberPlaceholder')}
        value={paymentData.cardNumber}
        onChange={(e) => handleCardNumberChange(e.target.value)}
        maxLength={16}
        required
      />

      <div className="flex flex-row justify-between space-x-2">
        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
          type="text"
          name="expiryDate"
          id="expiryDate"
          placeholder={t('expiryDatePlaceholder')}
          value={paymentData.expiryDate}
          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          maxLength={5}
          required
        />

        <input
          className="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
          type="text"
          name="cvv"
          id="cvv"
          placeholder={t('cvvPlaceholder')}
          value={paymentData.cvv}
          onChange={(e) => handleInputChange('cvv', e.target.value)}
          maxLength={3}
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"
      >
        {t('confirmPaymentButton')}
      </button>
    </form>
  );
}

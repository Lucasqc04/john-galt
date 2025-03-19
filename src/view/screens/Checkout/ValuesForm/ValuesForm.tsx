import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Btc from '../../../assets/bitcoin.svg';
import Brl from '../../../assets/brl.svg';
import Usdt from '../../../assets/usdt.svg';

import { FaQuestionCircle } from 'react-icons/fa';
import { useValuesForm } from './useValuesForm';

interface ValuesFormProps {
  selectedCrypto: 'BTC' | 'USDT';
  transactionType: 'buy' | 'sell';
  toggleTransactionType: () => void;
}

export function ValuesForm({
  selectedCrypto,
  transactionType,
  toggleTransactionType,
}: ValuesFormProps) {
  const { t, form, handleBrlChange } = useValuesForm(selectedCrypto);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!hasShownToast) {
      toast.info('A primeira compra tem um limite de R$ 500');
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const tooltip = document.getElementById('tooltip-container');
      const icon = document.getElementById('question-icon');
      if (
        tooltip &&
        !tooltip.contains(event.target as Node) &&
        icon &&
        !icon.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="space-y-1">
        <div className="w-full flex justify-center items-center brl-step">
          <div className="relative w-full">
            <input
              {...form.register('brlAmount', { required: true })}
              onChange={handleBrlChange}
              placeholder={t('checkout.brl_placeholder')}
              className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
              <img
                src={Brl}
                alt={t('checkout.brl_label')}
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center items-center pt-4">
          <div className="relative w-full">
            <button
              type="button"
              onClick={toggleTransactionType}
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-white ${transactionType === 'buy' ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-full text-sm`}
            >
              {transactionType === 'buy'
                ? t('checkout.buy')
                : t('checkout.sell')}
            </button>

            <input
              {...form.register('cryptoAmount', { required: true })}
              readOnly
              placeholder={
                selectedCrypto === 'BTC'
                  ? t('checkout.btc_placeholder')
                  : t('checkout.usdt_placeholder')
              }
              className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-black text-center w-full"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
              <img
                src={selectedCrypto === 'BTC' ? Btc : Usdt}
                alt={
                  selectedCrypto === 'BTC'
                    ? t('checkout.btc_label')
                    : t('checkout.usdt_label')
                }
                className="w-6 h-6 sm:w-10 sm:h-10"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-[-2rem] left-2">
        <div className="relative">
          <FaQuestionCircle
            id="question-icon"
            className="text-white cursor-pointer"
            size={24}
            onClick={toggleTooltip} // Alternar tooltip ao clicar
          />
          {showTooltip && (
            <div
              id="tooltip-container"
              className="absolute z-20 w-72 p-4 bg-gray-800 text-white text-sm rounded shadow-lg left-full top-full ml-2 mt-2"
            >
              <p>
                <strong>{t('checkout.tooltip_btc.title')}</strong>
              </p>
              <p>{t('checkout.tooltip_btc.minimum_value')}</p>
              <br />
              <p>
                <strong>{t('checkout.tooltip_usdt.title')}</strong>
              </p>
              <p>{t('checkout.tooltip.usdt.minimum_value')}</p>
              <hr className="my-2 border-gray-500" />
              <p>{t('checkout.tooltip.usdt.maximum_value')}</p>
              <hr className="my-2 border-gray-500" />
              <p>{t('checkout.tooltip_btc.pix_limit')}</p>
              <hr className="my-2 border-gray-500" />
              <p>
                <strong>{t('checkout.tooltip_attention.title')}</strong>
              </p>
              <p>{t('checkout.tooltip_attention.message')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

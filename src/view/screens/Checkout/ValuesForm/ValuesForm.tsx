import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Btc from '../../../assets/bitcoin.svg';
import Brl from '../../../assets/brl.svg';
import Usdt from '../../../assets/usdt.svg';
import { useValuesForm } from './useValuesForm';

interface ValuesFormProps {
  selectedCrypto: 'BTC' | 'USDT';
}

export function ValuesForm({ selectedCrypto }: ValuesFormProps) {
  const { t, form, handleBrlChange } = useValuesForm(selectedCrypto);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!hasShownToast) {
      toast.info('A primeira compra tem um limite de R$ 500');
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  return (
    <div className="relative w-full">
      {/* Reduzi o espaçamento entre os inputs para space-y-2 */}
      <div className="space-y-1">
        {/* Input do valor em BRL */}
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

        {/* Input do valor em Criptomoeda */}
        <div className="w-full flex justify-center items-center pt-4">
          <div className="relative w-full">
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

      {/* Ícone de interrogação posicionado ainda mais à esquerda */}
      <div className="absolute top-[-2rem] left-2">
        <FaQuestionCircle
          className="text-white cursor-pointer"
          size={24}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip((prev) => !prev)}
        />
        {showTooltip && (
          <div className="absolute z-10 w-72 p-4 bg-gray-800 text-white text-sm rounded shadow-lg left-full top-full ml-2 mt-2">
            <p>
              <strong>{t('checkout.tooltip_btc.title')}</strong>
            </p>
            <p>{t('checkout.tooltip_btc.minimum_value')}</p>
            <br />
            <p>
              <strong>{t('checkout.tooltip_usdt.title')}</strong>
            </p>
            <p>{t('checkout.tooltip_usdt.minimum_value')}</p>
            <hr className="my-2 border-gray-500" />
            <p>{t('checkout.tooltip_usdt.maximum_value')}</p>
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
  );
}

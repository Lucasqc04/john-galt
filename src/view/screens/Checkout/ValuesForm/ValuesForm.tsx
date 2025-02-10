import Btc from '../../../assets/bitcoin.svg';
import Brl from '../../../assets/brl.svg';
import { useValuesForm } from './useValuesForm';

export function ValuesForm() {
  const { t, form, handleBrlChange } = useValuesForm();

  return (
    <>
      <div className="w-full flex justify-center items-center brl-step">
        <div className="relative w-full">
          <input
            {...form.register('brlAmount', { required: true })}
            onChange={handleBrlChange}
            placeholder={t('checkout.brl_placeholder')}
            className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-transparent text-center w-full"
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
          <input
            {...form.register('btcAmount', { required: true })}
            readOnly
            placeholder={t('checkout.btc_placeholder')}
            className="border-2 px-16 py-3 rounded-3xl text-base sm:text-lg text-white placeholder-white bg-transparent text-center w-full"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
            <img
              src={Btc}
              alt={t('checkout.btc_label')}
              className="w-6 h-6 sm:w-10 sm:h-10"
            />
          </button>
        </div>
      </div>
    </>
  );
}

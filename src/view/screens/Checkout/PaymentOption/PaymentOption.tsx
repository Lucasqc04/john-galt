import classNames from 'classnames';
import { t } from 'i18next';
import { ReactNode } from 'react';
import { FaRegCreditCard } from 'react-icons/fa';
import Pix from '../../../assets/Pix.svg';
import { usePaymentOptions } from './usePaymentOptions';

type Option = {
  label: string;
  value: 'MP' | 'EFI' | 'BTC';
  icon: ReactNode;
};

const options: Option[] = [
  {
    label: t('paymentForm.creditCard'),
    value: 'EFI',
    icon: <FaRegCreditCard size={32} />,
  },
  {
    label: t('paymentForm.pix'),
    value: 'EFI',
    icon: <img src={Pix} alt="Pix" className="w-8" />,
  },
  {
    label: `${t('paymentForm.pix')} - MP`,
    value: 'MP',
    icon: <img src={Pix} alt="Pix" className="w-8" />,
  },
];

export function PaymentOptions() {
  const { handlePaymentSelection, selectedPaymentLabel } = usePaymentOptions();

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4 pt-2">
        {options.map((methodOption, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() =>
              handlePaymentSelection(methodOption.value, methodOption.label)
            }
            className={classNames(
              'w-full flex items-center justify-between rounded-md border border-solid px-4 py-3 transition-all duration-300 ease-in-out',
              'cursor-pointer',
              'border-gray-400 dark:border-gray-600',
              'bg-white dark:bg-gray-800',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              selectedPaymentLabel === methodOption.label &&
                'bg-blue-100 dark:bg-blue-600',
            )}
          >
            <span>{methodOption.icon}</span>
            <span className="w-full text-xl text-gray-900 dark:text-white">
              {methodOption.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

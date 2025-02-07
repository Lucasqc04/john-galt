import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { t } from 'i18next';
import React, { useEffect } from 'react';

const Button = ({
  onClick,
  children,
  variant,
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-3xl font-bold text-sm sm:text-base transition duration-300 ${
      variant === 'outline'
        ? 'border-2 border-[#F39200] text-[#F39200] hover:bg-[#F39200] hover:text-white'
        : 'bg-[#F39200] text-white hover:bg-orange-600'
    }`}
  >
    {children}
  </button>
);

interface ConfirmInfosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  brlAmount: string;
  btcAmount: string;
  network: string;
  coldWallet: string;
  paymentMethod: string;
  transactionNumber: string;
}

export default function ConfirmInfosModal({
  isOpen,
  onClose,
  onConfirm,
  brlAmount,
  btcAmount,
  network,
  coldWallet,
  paymentMethod,
  transactionNumber,
}: ConfirmInfosModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-[#040311] p-6 rounded-xl max-w-lg shadow-lg relative w-full"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl text-white font-semibold">
            {t('confirmModal.title')}
          </h2>
        </div>

        <div className="space-y-4 text-white mt-4">
          <p>
            {t('confirmModal.value')}:{' '}
            <span className="font-semibold">{brlAmount} BRL</span>
          </p>
          <p>
            {t('confirmModal.valueBTC')}:{' '}
            <span className="font-semibold">{btcAmount} BTC</span>
          </p>
          <p>
            {t('confirmModal.network')}:{' '}
            <span className="font-semibold">{network}</span>
          </p>
          <p>
            {t('confirmModal.coldWallet')}:{' '}
            <span className="font-semibold">{coldWallet}</span>
          </p>
          <p>
            {t('confirmModal.paymentMethod')}:{' '}
            <span className="font-semibold">{paymentMethod}</span>
          </p>
          <p>
            {t('confirmModal.transactionNumber')}:{' '}
            <span className="font-semibold">{transactionNumber}</span>
          </p>
        </div>

        <div className="flex justify-between space-x-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            {t('confirmModal.cancel')}
          </Button>
          <Button onClick={onConfirm}>{t('confirmModal.confirm')}</Button>
        </div>
      </motion.div>
    </div>
  );
}

import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

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
  const [onchainFee, setOnchainFee] = useState<number | null>(null);
  const [btcToBrl, setBtcToBrl] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchBtcToBrl = async (): Promise<number> => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl',
        );
        const data = await response.json();
        return data.bitcoin.brl;
      } catch (error) {
        console.error('Erro ao buscar a cotação do BTC:', error);
        return 0;
      }
    };

    const fetchOnchainFee = async () => {
      try {
        const response = await fetch(
          'https://mempool.space/api/v1/fees/recommended',
        );
        const data = await response.json();
        const satPerVByte = data.halfHourFee;
        const btcToBrl = await fetchBtcToBrl();
        const transactionSize = 250;

        const feeInSats = satPerVByte * transactionSize;
        const feeInBTC = feeInSats / 1e8;
        const feeInBRL = feeInBTC * btcToBrl;

        setOnchainFee(feeInBRL);
        setBtcToBrl(btcToBrl);
      } catch (error) {
        console.error('Erro ao buscar a taxa on-chain:', error);
      }
    };

    if (network.toLowerCase() === 'onchain') {
      fetchOnchainFee();
    } else {
      setOnchainFee(null);
    }
  }, [network]);

  if (
    !isOpen ||
    btcToBrl === null ||
    (network.toLowerCase() === 'onchain' && onchainFee === null)
  )
    return null;

  const brlAmountNum = parseFloat(
    brlAmount.replace(/[^\d,]/g, '').replace(',', '.'),
  );

  const swapFee = brlAmountNum * 0.02;

  const totalFees = swapFee + (onchainFee || 0);
  const expectedAmount = brlAmountNum - totalFees;

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
          <p>
            {t('confirmModal.swapFee')}:{' '}
            <span className="font-semibold">{swapFee.toFixed(2)} BRL (2%)</span>
          </p>
          {network.toLowerCase() === 'onchain' && (
            <>
              <p>
                {t('confirmModal.onchainFee')}:{' '}
                <span className="font-semibold">
                  {onchainFee?.toFixed(2)} BRL
                </span>
              </p>
              <p>
                {t('confirmModal.totalFees')}:{' '}
                <span className="font-semibold">
                  {totalFees.toFixed(2)} BRL
                </span>
              </p>
            </>
          )}
          <p>
            {t('confirmModal.expectedAmount')}:{' '}
            <span className="font-semibold">
              {expectedAmount.toFixed(2)} BRL
            </span>
          </p>

          {/* Aviso sobre a taxa do Alfred */}
          <p className="text-sm text-yellow-400 mt-4">
            {t('confirmModal.alfredFeeWarning')}
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

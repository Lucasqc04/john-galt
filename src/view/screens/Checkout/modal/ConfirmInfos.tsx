import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useConfirmInfos } from './useConfirmInfos';

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
  cupom: string;
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
  cupom,
}: ConfirmInfosModalProps) {
  const {
    onchainFee,
    btcToBrl,
    swapFee,
    totalFees,
    expectedAmount,
    alfredFee,
    alfredFeeRate,
  } = useConfirmInfos(network, brlAmount, cupom);
  const [isDataVisible, setIsDataVisible] = useState(false);
  const [isTaxVisible, setIsTaxVisible] = useState(false);

  if (!isOpen) return null;

  if (
    network.toLowerCase() === 'onchain' &&
    onchainFee === null &&
    btcToBrl === null
  )
    return null;

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

        <div className="text-center mb-6">
          <h2 className="text-2xl text-white font-semibold">
            Confirmar Informações
          </h2>
          <p className="text-sm text-gray-300 mt-2">
            Por favor, revise as informações da transação antes de confirmar.
          </p>
        </div>

        <div className="space-y-6 text-white">
          {/* Seção de Valor */}
          <div className="bg-[#1a1d2b] p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="w-6 h-6 text-[#F39200]" />
              <h3 className="text-lg font-semibold">Valor</h3>
            </div>
            <p>
              R$ <span className="text-xl font-bold">{brlAmount}</span> BRL
            </p>
            <p>
              Em Bitcoin:{' '}
              <span className="text-xl font-bold">{btcAmount} BTC</span>
            </p>
          </div>

          {/* Toggle Meus Dados */}
          <div
            className="bg-[#1a1d2b] p-4 rounded-lg cursor-pointer"
            onClick={() => setIsDataVisible(!isDataVisible)}
          >
            <div className="flex items-center space-x-2">
              <InformationCircleIcon className="w-6 h-6 text-[#F39200]" />
              <h3 className="text-lg font-semibold">Meus Dados</h3>
              {isDataVisible ? (
                <ChevronUpIcon className="w-5 h-5 text-[#F39200]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#F39200]" />
              )}
            </div>
            {isDataVisible && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Carteira Bitcoin:</strong> {coldWallet}
                </p>
                <p>
                  <strong>Número de Contato:</strong> {transactionNumber}
                </p>
                <p>
                  <strong>Cupom:</strong> {cupom || 'Nenhum'}
                </p>
                <p>
                  <strong>Rede:</strong> {network}
                </p>
                <p>
                  <strong>Método de Pagamento:</strong> {paymentMethod}
                </p>
              </div>
            )}
          </div>

          {/* Toggle Taxas */}
          <div
            className="bg-[#1a1d2b] p-4 rounded-lg cursor-pointer"
            onClick={() => setIsTaxVisible(!isTaxVisible)}
          >
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="w-6 h-6 text-[#F39200]" />
              <h3 className="text-lg font-semibold">Taxas</h3>
              {isTaxVisible ? (
                <ChevronUpIcon className="w-5 h-5 text-[#F39200]" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-[#F39200]" />
              )}
            </div>
            {isTaxVisible && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>taxa de conversão:</strong> R$ {swapFee.toFixed(2)}{' '}
                  (2%)
                </p>
                {network.toLowerCase() === 'onchain' && (
                  <p>
                    <strong>Taxa Rede Onchain:</strong> R${' '}
                    {onchainFee?.toFixed(2)} (variável)
                  </p>
                )}
                <p>
                  <strong>Taxa Alfred:</strong> R$ {alfredFee.toFixed(2)} (
                  {(alfredFeeRate * 100).toFixed(2)}%)
                </p>
                <p>
                  <strong>Total de Taxas:</strong> R$ {totalFees.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          {/* Resumo Final */}
          <div className="bg-[#1a1d2b] p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <ArrowPathIcon className="w-6 h-6 text-[#F39200]" />
              <h3 className="text-lg font-semibold">Resumo Final</h3>
            </div>
            <p>
              <strong>Valor Esperado após taxas:</strong> R${' '}
              {expectedAmount.toFixed(2)}
            </p>
          </div>

          {/* Botões */}
          <div className="flex justify-between space-x-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={onConfirm}>Confirmar</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

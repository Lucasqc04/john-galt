import { useEffect, useState } from 'react';

export function useConfirmInfos(
  network: string,
  brlAmount: string,
  alfredFeePercentage: number,
) {
  const [localAlfredFeePercentage, setLocalAlfredFeePercentage] =
    useState<number>(alfredFeePercentage);

  useEffect(() => {
    setLocalAlfredFeePercentage(alfredFeePercentage);
  }, [alfredFeePercentage]);

  const [onchainFee, setOnchainFee] = useState<number | null>(null);
  const [btcToBrl, setBtcToBrl] = useState<number | null>(null);

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

  const brlAmountNum = parseFloat(
    brlAmount.replace(/[^\d,]/g, '').replace(',', '.'),
  );

  const alfredFeeRate =
    brlAmountNum >= 1000
      ? localAlfredFeePercentage / 100
      : (localAlfredFeePercentage * 2) / 100;
  const alfredFee = brlAmountNum * alfredFeeRate;

  const afterAlfredFee = brlAmountNum - alfredFee;
  const swapFee = afterAlfredFee * 0.02;
  const totalFees = alfredFee + swapFee + (onchainFee || 0);
  const finalAmount = afterAlfredFee - swapFee - (onchainFee || 0);

  return {
    onchainFee,
    btcToBrl,
    swapFee,
    totalFees,
    expectedAmount: finalAmount,
    alfredFee,
    alfredFeeRate,
  };
}

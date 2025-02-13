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
  const [usdToBrl, setUsdToBrl] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,usd&vs_currencies=brl',
        );
        const data = await response.json();
        setBtcToBrl(data.bitcoin.brl || 0);
        setUsdToBrl(data.usd.brl || 0);
      } catch (error) {
        console.error('Erro ao buscar cotações:', error);
        setBtcToBrl(0);
        setUsdToBrl(0);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    const fetchOnchainFee = async () => {
      if (network.toLowerCase() !== 'onchain') {
        setOnchainFee(null);
        return;
      }
      try {
        const response = await fetch(
          'https://mempool.space/api/v1/fees/recommended',
        );
        const data = await response.json();
        const satPerVByte = data.halfHourFee;
        const transactionSize = 140;

        const feeInSats = satPerVByte * transactionSize;
        const feeInBTC = feeInSats / 1e8;
        const feeInBRL = btcToBrl ? feeInBTC * btcToBrl : 0;

        setOnchainFee(feeInBRL);
      } catch (error) {
        console.error('Erro ao buscar a taxa on-chain:', error);
        setOnchainFee(null);
      }
    };

    fetchOnchainFee();
  }, [network, btcToBrl]);

  const brlAmountNum = parseFloat(
    brlAmount.replace(/[^\d,]/g, '').replace(',', '.'),
  );

  const alfredFeeRate =
    brlAmountNum >= 1000
      ? localAlfredFeePercentage / 100
      : (localAlfredFeePercentage * 2) / 100;
  const alfredFee = brlAmountNum * alfredFeeRate;

  const conversionFeeUsd = 0.65;
  const conversionFeeBrl = conversionFeeUsd * (usdToBrl || 0);
  const swapFee = brlAmountNum * 0.02 + conversionFeeBrl;
  const totalFees = alfredFee + swapFee + (onchainFee || 0);
  const finalAmount = brlAmountNum - totalFees;

  const expectedAmountBTC = btcToBrl
    ? (finalAmount / btcToBrl).toFixed(8)
    : '0.00000000';

  return {
    onchainFee,
    btcToBrl,
    usdToBrl,
    swapFee,
    totalFees,
    expectedAmount: finalAmount,
    expectedAmountBTC,
    alfredFee,
    alfredFeeRate,
    conversionFeeUsdBrl: conversionFeeBrl,
  };
}

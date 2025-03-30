import { useEffect, useState } from 'react';

export function useConfirmInfos(
  network: string,
  fiatAmount: string, // valor inserido, podendo ser BRL ou USD
  fiatType: string, // "BRL" ou "USD" (ou outra moeda, mas a lógica aqui trata BRL e USD)
  alfredFeePercentage: number,
  cryptoType: string,
  paymentMethod?: string,
  cupom?: string,
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

  // Converte o valor fiat para número (considerando que pode vir com vírgula ou outros símbolos)
  const fiatAmountNum = parseFloat(
    fiatAmount.replace(/[^\d,]/g, '').replace(',', '.'),
  );

  // Converte o valor para BRL se o fiatType for diferente de BRL
  const amountBRL =
    fiatType.toUpperCase() === 'BRL'
      ? fiatAmountNum
      : fiatAmountNum * (usdToBrl || 0);

  let alfredFeeRate = localAlfredFeePercentage / 100;
  if (amountBRL >= 6001) {
    const isBoleto = paymentMethod?.toLowerCase().includes('ticket');
    const hasCupom = cupom && cupom.trim() !== '';
    if (isBoleto) {
      alfredFeeRate = hasCupom ? 0.0599 : 0.07;
    } else {
      alfredFeeRate = hasCupom ? 0.0499 : 0.06;
    }
  }
  const alfredFee = amountBRL * alfredFeeRate;

  if (cryptoType.toLowerCase() === 'usdt') {
    // Para USDT, não aplica taxa de conversão
    const conversionFeeBrl = 0;
    const swapFee = amountBRL * 0.0158; // taxa de swap de 1.58%
    const totalFees = alfredFee + swapFee + (onchainFee || 0);
    const finalAmount = amountBRL - totalFees;
    // Para USDT, o valor esperado é dado convertendo o finalAmount em BRL para USD
    const expectedAmountUSDT = usdToBrl
      ? (finalAmount / usdToBrl).toFixed(2)
      : '0.00';

    return {
      onchainFee,
      btcToBrl,
      usdToBrl,
      swapFee,
      totalFees,
      expectedAmount: finalAmount,
      expectedAmountCrypto: expectedAmountUSDT,
      alfredFee,
      alfredFeeRate,
      conversionFeeUsdBrl: conversionFeeBrl,
    };
  } else {
    // Para BTC (ou outros), aplica a taxa de conversão
    const conversionFeeUsd = 0.65;
    const conversionFeeBrl = conversionFeeUsd * (usdToBrl || 0);
    const swapFee = amountBRL * 0.02 + conversionFeeBrl;
    const totalFees = alfredFee + swapFee + (onchainFee || 0);
    const finalAmount = amountBRL - totalFees;
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
      expectedAmountCrypto: expectedAmountBTC,
      alfredFee,
      alfredFeeRate,
      conversionFeeUsdBrl: conversionFeeBrl,
    };
  }
}

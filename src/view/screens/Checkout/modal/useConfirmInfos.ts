import { useEffect, useState } from 'react';

interface CouponResponse {
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
}

export function useConfirmInfos(
  network: string,
  brlAmount: string,
  cupom: string,
) {
  const [onchainFee, setOnchainFee] = useState<number | null>(null);
  const [btcToBrl, setBtcToBrl] = useState<number | null>(null);
  const [alfredFeePercentage, setAlfredFeePercentage] = useState<number>(5); // Começa em 5% (default)

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

  useEffect(() => {
    const checkCoupon = async () => {
      if (!cupom) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/coupons/is-valid`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: cupom }),
          },
        );

        if (!response.ok) throw new Error('Cupom inválido');

        const data: CouponResponse = await response.json();

        let newAlfredFeePercentage = 5; // Começa com 5% padrão

        if (data.discountType === 'percentage') {
          newAlfredFeePercentage = data.discountValue; // Usa o valor do cupom como nova taxa Alfred
        }

        setAlfredFeePercentage(newAlfredFeePercentage);
      } catch (error) {
        console.error('Erro ao validar cupom:', error);
        setAlfredFeePercentage(5); // Se der erro, mantém os 5% padrão
      }
    };

    checkCoupon();
  }, [cupom, brlAmount]);

  const brlAmountNum = parseFloat(
    brlAmount.replace(/[^\d,]/g, '').replace(',', '.'),
  );

  // Aplicar a lógica correta para a taxa Alfred
  const alfredFeeRate =
    brlAmountNum >= 1000
      ? alfredFeePercentage / 100
      : (alfredFeePercentage * 2) / 100;
  const alfredFee = brlAmountNum * alfredFeeRate;

  const afterAlfredFee = brlAmountNum - alfredFee;
  const swapFee = afterAlfredFee * 0.02; // Taxa de troca fixa de 2%
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

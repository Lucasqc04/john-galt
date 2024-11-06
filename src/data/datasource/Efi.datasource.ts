import EfiPay from 'payment-token-efi';
import { DefaultResultError, Result } from '../../utils/Result';

type Installment = {
  installment: number;
  has_interest: boolean;
  value: number;
  currency: string;
  interest_percentage: number;
};

type InstallmentsResponse = {
  rate: number;
  name: string;
  installments: Installment[];
};

type IdentifyBrandReq = {
  cardNumber: string;
};
type IdentifyBrandRes = Promise<Result<string, DefaultResultError>>;

type ListInstallmentsReq = {
  brand: string;
  total: number;
};
type ListInstallmentsRes = Promise<
  Result<InstallmentsResponse, { code: 'VALUE_TOO_LOW' } | DefaultResultError>
>;

type GeneratePaymentTokenReq = {
  brand: string;
  number: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  reuse: boolean;
};
type GeneratePaymentTokenRes = Promise<
  Result<
    {
      payment_token: string;
      card_mask: string;
    },
    DefaultResultError
  >
>;

export interface EfiDatasource {
  identifyBrand(req: IdentifyBrandReq): IdentifyBrandRes;
  listInstallments(req: ListInstallmentsReq): ListInstallmentsRes;
  generatePaymentToken(req: GeneratePaymentTokenReq): GeneratePaymentTokenRes;
}

export class EfiDatasourceImpl implements EfiDatasource {
  accountId!: string;
  env!: 'production' | 'sandbox';

  constructor() {
    this.accountId = String(import.meta.env.VITE_EFI_ACCOUNT_ID);
    this.env =
      String(import.meta.env.VITE_NODE_ENV) === 'development'
        ? 'sandbox'
        : 'production';
  }

  async identifyBrand(req: IdentifyBrandReq): IdentifyBrandRes {
    try {
      const brand = await EfiPay.CreditCard.setCardNumber(
        req.cardNumber,
      ).verifyCardBrand();

      return Result.Success(brand);
    } catch {
      return Result.Error({ code: 'UNKNOWN' });
    }
  }

  async listInstallments(req: ListInstallmentsReq): ListInstallmentsRes {
    try {
      const installments = await EfiPay.CreditCard.setAccount(this.accountId)
        .setEnvironment(this.env)
        .setBrand(req.brand)
        .setTotal(req.total)
        .getInstallments();

      if (
        'rate' in installments &&
        'name' in installments &&
        'installments' in installments
      ) {
        return Result.Success(installments);
      } else {
        console.log('erro no else');
        return Result.Error({ code: 'UNKNOWN' });
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('O valor [100] é inferior ao limite mínimo')
      ) {
        return Result.Error({ code: 'VALUE_TOO_LOW' });
      }
      return Result.Error({ code: 'UNKNOWN' });
    }
  }

  async generatePaymentToken(
    req: GeneratePaymentTokenReq,
  ): GeneratePaymentTokenRes {
    try {
      const result = await EfiPay.CreditCard.setAccount(this.accountId)
        .setEnvironment(this.env)
        .setCreditCardData({
          brand: req.brand,
          number: req.number,
          cvv: req.cvv,
          expirationMonth: req.expirationMonth,
          expirationYear: req.expirationYear,
          reuse: req.reuse,
        })
        .getPaymentToken();

      if ('payment_token' in result && 'card_mask' in result) {
        return Result.Success(result);
      } else {
        return Result.Error({ code: 'UNKNOWN' });
      }
    } catch {
      return Result.Error({ code: 'UNKNOWN' });
    }
  }
}

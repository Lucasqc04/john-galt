import { PaymentMethod } from '../../domain/entities/payment.entity';
import { DefaultResultError, Result } from '../../utils/Result';
import { EfiDatasource } from '../datasource/Efi.datasource';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  CreatedCheckoutModel,
  GeneratedPaymentTokenModel,
  GeneratePaymentTokenModel,
  GetCheckoutModel,
  IdentifyBrandModel,
  InstallmentsResponseModel,
  ListInstallmentsModel,
} from '../model/Payment.model.';

export type CreateReq = GetCheckoutModel;

export type CreateRes = Promise<
  Result<CreatedCheckoutModel, { code: 'SERIALIZATION' } | DefaultResultError>
>;

type IdentifyBrandReq = IdentifyBrandModel;
type IdentifyBrandRes = Promise<Result<string, DefaultResultError>>;

type ListInstallmentsReq = ListInstallmentsModel;
type ListInstallmentsRes = Promise<
  Result<InstallmentsResponseModel, DefaultResultError>
>;

type GeneratePaymentTokenReq = GeneratePaymentTokenModel;
type GeneratePaymentTokenRes = Promise<
  Result<GeneratedPaymentTokenModel, DefaultResultError>
>;

export interface PaymentRepository {
  create(req: CreateReq, method: PaymentMethod): CreateRes;
  identifyBrand(req: IdentifyBrandReq): IdentifyBrandRes;
  listInstallments(req: ListInstallmentsReq): ListInstallmentsRes;
  generatePaymentToken(req: GeneratePaymentTokenReq): GeneratePaymentTokenRes;
}

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    private api: RemoteDataSource,
    private efiDatasource: EfiDatasource,
  ) {}

  async create(req: CreateReq, method: PaymentMethod): CreateRes {
    try {
      const result = await this.api.post({
        url: `/create-payment/${method}`,
        model: CreatedCheckoutModel,
        body: req,
      });

      if (!result) {
        return Result.Error({ code: 'SERIALIZATION' });
      }

      return Result.Success(result);
    } catch {
      return Result.Error({ code: 'UNKNOWN' });
    }
  }

  async identifyBrand(req: IdentifyBrandReq): IdentifyBrandRes {
    try {
      const { result } = await this.efiDatasource.identifyBrand(req);

      if (result.type == 'ERROR') {
        return Result.Error({ code: 'UNKNOWN' });
      }

      return Result.Success(result.data);
    } catch {
      return Result.Error({ code: 'UNKNOWN' });
    }
  }

  async listInstallments(req: ListInstallmentsReq): ListInstallmentsRes {
    const { result } = await this.efiDatasource.listInstallments(req);

    if (result.type == 'ERROR') {
      return Result.Error({ code: 'UNKNOWN' });
    }

    return Result.Success(result.data);
  }

  async generatePaymentToken(
    req: GeneratePaymentTokenReq,
  ): GeneratePaymentTokenRes {
    try {
      const { result } = await this.efiDatasource.generatePaymentToken(req);

      if (result.type == 'ERROR') {
        return Result.Error({ code: 'UNKNOWN' });
      }

      return Result.Success(result.data);
    } catch {
      return Result.Error({ code: 'UNKNOWN' });
    }
  }
}

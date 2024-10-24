import { PaymentMethod } from '../../domain/entities/payment.entity';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  CreatedCheckoutModel,
  GetCheckoutModel,
} from '../model/Payment.model.';

export type CreateReq = GetCheckoutModel;

export type CreateRes = Promise<
  Result<CreatedCheckoutModel, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface PaymentRepository {
  create(req: CreateReq, method: PaymentMethod): CreateRes;
}

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private api: RemoteDataSource) {}

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
}

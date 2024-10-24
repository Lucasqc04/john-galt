import { PaymentRepository } from '../../../data/repositories/Payment.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { CreatedCheckout, GetCheckout } from '../../entities/payment.entity';

export type CreateReq = GetCheckout;

export type CreateRes = Promise<
  Result<CreatedCheckout, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type CreatePaymentUseCase = UseCase<CreateReq, CreateRes>;

export class CreatePaymentUseCaseImpl implements CreatePaymentUseCase {
  constructor(private repository: PaymentRepository) {}

  async execute(req: CreateReq): CreateRes {
    const { result } = await this.repository.create(
      GetCheckout.toModel(req),
      req.method,
    );

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(CreatedCheckout.fromModel(result.data));
  }
}

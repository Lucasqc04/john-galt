import { PaymentRepository } from '../../../data/repositories/Payment.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { Brand, IdentifyBrand } from '../../entities/payment.entity';

export type IdentifyBrandReq = IdentifyBrand;

export type IdentifyBrandRes = Promise<Result<Brand, DefaultResultError>>;

export type IdentifyBrandUseCase = UseCase<IdentifyBrandReq, IdentifyBrandRes>;

export class IdentifyBrandUseCaseImpl implements IdentifyBrandUseCase {
  constructor(private repository: PaymentRepository) {}

  async execute(req: IdentifyBrandReq): IdentifyBrandRes {
    const { result } = await this.repository.identifyBrand(
      IdentifyBrand.toModel(req),
    );

    if (result.type === 'ERROR') {
      return Result.Error({ code: 'UNKNOWN' });
    }

    switch (result.data) {
      case 'visa':
        return Result.Success('visa');
      case 'mastercard':
        return Result.Success('mastercard');
      case 'amex':
        return Result.Success('amex');
      case 'elo':
        return Result.Success('elo');
      case 'hipercard':
        return Result.Success('hipercard');
      case 'unsupported':
        return Result.Success('unsupported');
      default:
        return Result.Success('undefined');
    }
  }
}

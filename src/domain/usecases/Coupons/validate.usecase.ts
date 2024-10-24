import { CouponRepository } from '../../../data/repositories/Coupon.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { ValidateCoupon, ValidatedCoupon } from '../../entities/Coupon.entity';

export type ValidateReq = ValidateCoupon;

export type ValidateRes = Promise<
  Result<ValidatedCoupon, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type ValidateCouponUseCase = UseCase<ValidateReq, ValidateRes>;

export class ValidateCouponUseCaseImpl implements ValidateCouponUseCase {
  constructor(private repository: CouponRepository) {}

  async execute(req: ValidateReq): ValidateRes {
    const { result } = await this.repository.validate(req);

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(ValidatedCoupon.fromModel(result.data));
  }
}

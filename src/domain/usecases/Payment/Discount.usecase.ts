import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import {
  CalculatedDiscount,
  CalculateDiscount,
} from '../../entities/payment.entity';

export type CalculateDiscountReq = CalculateDiscount;

export type CalculateDiscountRes = Promise<
  Result<CalculatedDiscount, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type CalculateDiscountUseCase = UseCase<
  CalculateDiscountReq,
  CalculateDiscountRes
>;

export class CalculateDiscountUseCaseImpl implements CalculateDiscountUseCase {
  constructor() {}

  async execute(req: CalculateDiscountReq): CalculateDiscountRes {
    const {
      discountType,
      discountValue,
      minPurchaseValue,
      maxDiscountValue,
      isActive,
    } = req.couponData;

    const validMinPurchaseValue = minPurchaseValue ?? 0;
    const validMaxDiscountValue = maxDiscountValue ?? Infinity;

    if (!isActive || req.totalValue < validMinPurchaseValue) {
      return Result.Success({ recalculatedDiscount: 0, isValid: false });
    }

    const discount =
      discountType === 'percentage'
        ? Math.min(
            (req.totalValue + req.shipping) * (discountValue / 100),
            validMaxDiscountValue,
          )
        : Math.min(discountValue, validMaxDiscountValue);

    return Result.Success({
      recalculatedDiscount: discount,
      isValid: true,
    });
  }
}

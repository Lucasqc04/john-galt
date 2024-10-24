import { z } from 'zod';
import { ValidatedCouponModel } from '../../data/model/Coupon.model';

export const ValidateCoupon = z.object({
  code: z.string().min(1),
});
export type ValidateCoupon = z.infer<typeof ValidateCoupon>;

export enum DiscountType {
  'percentage' = 'percentage',
  'fixedAmount' = 'fixed_amount',
}

export class ValidatedCoupon {
  discountType!: DiscountType;
  discountValue!: number;
  isActive!: boolean;
  maxDiscountValue!: number | null;
  minPurchaseValue!: number | null;
  usageLimit!: number | null;
  usedCount!: number;
  validUntil!: string;

  public static fromModel(model: ValidatedCouponModel): ValidatedCoupon {
    const entity = new ValidatedCoupon();

    entity.discountType = model.discountType;

    entity.discountValue = model.discountValue;

    entity.isActive = model.isActive;

    entity.maxDiscountValue = model.maxDiscountValue;

    entity.minPurchaseValue = model.minPurchaseValue;

    entity.usageLimit = model.usageLimit;

    entity.usedCount = model.usedCount;

    if (model.validUntil) {
      entity.validUntil = model.validUntil;
    }

    return entity;
  }
}

import { z } from 'zod';
import { DiscountType } from '../../domain/entities/Coupon.entity';

export class ValidateCouponModel {
  code!: string;
}

export const ValidatedCouponModel = z.object({
  discountType: z.nativeEnum(DiscountType),
  discountValue: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val)),
  isActive: z.boolean(),
  maxDiscountValue: z
    .union([z.string(), z.number()])
    .nullable()
    .transform((val) => (val === null ? null : Number(val))),
  minPurchaseValue: z
    .union([z.string(), z.number()])
    .nullable()
    .transform((val) => (val === null ? null : Number(val))),
  usageLimit: z.number().nullable(),
  usedCount: z.number(),
  validUntil: z.string(),
});
export type ValidatedCouponModel = z.infer<typeof ValidatedCouponModel>;

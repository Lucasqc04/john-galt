import { z } from 'zod';
import { DiscountType } from '../../domain/entities/Coupon.entity';

export class ValidateCouponModel {
  code!: string;
}

export const ValidatedCouponModel = z.object({
  discountType: z.nativeEnum(DiscountType),
  discountValue: z.string().transform((val) => Number(val)),
  isActive: z.boolean(),
  maxDiscountValue: z
    .string()
    .nullable()
    .transform((val) => Number(val)),
  minPurchaseValue: z
    .string()
    .nullable()
    .transform((val) => Number(val)),
  usageLimit: z.number().nullable(),
  usedCount: z.number(),
  validUntil: z.string(),
});
export type ValidatedCouponModel = z.infer<typeof ValidatedCouponModel>;

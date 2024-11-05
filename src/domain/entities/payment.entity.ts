import { z } from 'zod';
import {
  CreatedCheckoutModel,
  IdentifyBrandModel,
  InstallmentModel,
  ListInstallmentsModel,
} from '../../data/model/Payment.model.';
import { DiscountType } from './Coupon.entity';

const Address = z.object({
  city: z.string().min(1),
  number: z.string().min(1),
  state: z.string().min(1),
  street: z.string().min(1),
  zipCode: z.string().min(1).max(9),
  complement: z.string().optional(),
  uf: z.string().min(2).max(2),
});
type Address = z.infer<typeof Address>;

const Identification = z.object({
  type: z.enum(['CPF', 'CNPJ']),
  number: z.string().min(1),
});
type Identification = z.infer<typeof Identification>;

const Phone = z.object({
  areaCode: z.string().min(1),
  number: z.string().min(1),
});
type Phone = z.infer<typeof Phone>;

export const Items = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  title: z.string().optional(),
  quantity: z.number(),
  price: z.number(),
  imageUrl: z.string(),
  categoryId: z.string().min(1),
  description: z.string().min(1),
});
export type Items = z.infer<typeof Items>;

export const PaymentMethod = z.enum(['MP', 'EFI', 'BTC']);
export type PaymentMethod = z.infer<typeof PaymentMethod>;

export const Brand = z.enum([
  'elo',
  'visa',
  'amex',
  'mastercard',
  'hipercard',
  'undefined',
  'unsupported',
]);
export type Brand = z.infer<typeof Brand>;

export const Installments = z.array(
  z.object({
    installment: z.number(),
    value: z.number(),
    currency: z.string(),
  }),
);

export type Installments = z.infer<typeof Installments>;

export const GetCheckout = z.object({
  items: z.array(Items),
  payerEmail: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  identification: Identification,
  address: Address,
  phone: Phone,
  couponCode: z.string().optional(),
  method: PaymentMethod,
  cardName: z.string(),
  cardNumber: z.string(),
  expiryDate: z.string(),
  cvv: z.string(),
  brand: Brand,
  installments: Installments,
  selectInstallments: z.string(),
  total: z.number(),
});
export type GetCheckout = z.infer<typeof GetCheckout>;

export class CreatedCheckout {
  paymentLink!: string;

  public static fromModel(model: CreatedCheckoutModel): CreatedCheckout {
    const entity = new CreatedCheckout();

    entity.paymentLink = model.initPoint;

    return entity;
  }
}

class CouponData {
  discountType!: DiscountType;
  discountValue!: number;
  minPurchaseValue!: number | null;
  maxDiscountValue!: number | null;
  isActive!: boolean;
}

export class CalculateDiscount {
  totalValue!: number;
  shipping!: number;
  couponData!: CouponData;
}

export class CalculatedDiscount {
  recalculatedDiscount!: number;
  isValid!: boolean;
}

export class IdentifyBrand {
  cardNumber!: string;

  public static toModel(entity: IdentifyBrand): IdentifyBrandModel {
    const model = new IdentifyBrandModel();

    model.cardNumber = entity.cardNumber;

    return model;
  }
}

export class ListInstallments {
  brand!: string;
  total!: number;

  public static toModel(entity: ListInstallments): ListInstallmentsModel {
    const model = new ListInstallmentsModel();

    model.brand = entity.brand;

    model.total = entity.total;

    return model;
  }
}

export class Installment {
  installment!: number;
  value!: number;
  currency!: string;

  public static fromModel(model: InstallmentModel): Installment {
    const entity = new Installment();

    entity.currency = model.currency;

    entity.value = model.value;

    entity.installment = model.installment;

    return entity;
  }
}

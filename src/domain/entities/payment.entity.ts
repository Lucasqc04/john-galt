import { z } from 'zod';
import { CreatedCheckoutModel } from '../../data/model/Payment.model.';

export class Payment {
  cardName!: string;
  cardNumber!: string;
  expiryDate!: string;
  cvv!: string;
}

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

export enum PaymentMethod {
  'MP' = 'MP',
  'BTC' = 'BTC',
}

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

export const GetCheckout = z.object({
  items: z.array(Items),
  payerEmail: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  identification: Identification,
  address: Address,
  phone: Phone,
  couponCode: z.string().optional(),
  method: z.nativeEnum(PaymentMethod),
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

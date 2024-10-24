import { z } from 'zod';

class Address {
  street!: string;
  number!: string;
  complement?: string;
  city!: string;
  state!: string;
  zipCode!: string;
}

class Identification {
  type!: 'CPF' | 'CNPJ';
  number!: string;
}

export class PaymentItemsModel {
  id!: string;
  name!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  category_id!: string;
}

export class GetCheckoutModel {
  payerEmail!: string;
  firstName!: string;
  lastName!: string;
  identification!: Identification;
  couponCode?: string;
  address!: Address;
  items!: PaymentItemsModel[];
}

export const CreatedCheckoutModel = z.object({
  initPoint: z.string().min(1),
});
export type CreatedCheckoutModel = z.infer<typeof CreatedCheckoutModel>;

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
  quantity!: number;
  price!: number;
  categoryId!: string;
  description!: string;
}

class PhoneModel {
  areaCode!: string;
  number!: string;
}

export class GetCheckoutModel {
  payerEmail!: string;
  firstName!: string;
  lastName!: string;
  identification!: Identification;
  couponCode?: string;
  address!: Address;
  items!: PaymentItemsModel[];
  phone!: PhoneModel;
}

export const CreatedCheckoutModel = z.object({
  initPoint: z.string().min(1),
});
export type CreatedCheckoutModel = z.infer<typeof CreatedCheckoutModel>;

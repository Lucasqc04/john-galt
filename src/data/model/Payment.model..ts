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

export class ListInstallmentsModel {
  brand!: string;
  total!: number;
}

export class InstallmentModel {
  installment!: number;
  has_interest!: boolean;
  value!: number;
  currency!: string;
  interest_percentage!: number;
}

export class InstallmentsResponseModel {
  rate!: number;
  name!: string;
  installments!: InstallmentModel[];
}

export class IdentifyBrandModel {
  cardNumber!: string;
}

export class GeneratePaymentTokenModel {
  brand!: string;
  number!: string;
  cvv!: string;
  expirationMonth!: string;
  expirationYear!: string;
  reuse!: boolean;
}

export class GeneratedPaymentTokenModel {
  payment_token!: string;
  card_mask!: string;
}

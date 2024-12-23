import { z } from 'zod';

class Address {
  street!: string;
  number!: string;
  complement?: string;
  city!: string;
  state!: string;
  zipCode!: string;
  neighborhood!: string;
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
  cardName!: string;
  cardNumber!: string;
  expirationMonth!: string;
  expirationYear!: string;
  cvv!: string;
  brand!:
    | 'elo'
    | 'visa'
    | 'amex'
    | 'mastercard'
    | 'hipercard'
    | 'undefined'
    | 'unsupported';
  installments!: InstallmentModel[];
  selectInstallments!: string;
  total!: number;
  birthday!: string;
  paymentOption!: 'creditCard' | 'pix' | 'BTC' | 'YAMPI';
}

export const CreatedCheckoutModel = z.object({
  initPoint: z.string().min(1),
});
export type CreatedCheckoutModel = z.infer<typeof CreatedCheckoutModel>;

const ChargedModel = z.object({
  installments: z.number(),
  installment_value: z.number(),
  charge_id: z.number(),
  total: z.number(),
  payment: z.literal('credit_card'),
});

const ApprovedChargeModel = ChargedModel.extend({
  status: z.literal('approved'),
});

const UnpaidChargeModel = ChargedModel.extend({
  status: z.literal('unpaid'),
  refusal: z.object({
    reason: z.string(),
    retry: z.boolean(),
  }),
});

const ApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.number(),
    data: dataSchema,
  });

export const PaymentAPIResponse = ApiResponse(
  z.union([ApprovedChargeModel, UnpaidChargeModel]),
);
export type PaymentAPIResponse = z.infer<typeof PaymentAPIResponse>;

export const ChargedPIXModel = z.object({
  calendary: z.object({
    creation: z.string().min(1),
    expiration: z.number().min(1),
  }),
  location: z.string().min(1),
  pixCopyAndPaste: z.string().min(1),
});
export type ChargedPIXModel = z.infer<typeof ChargedPIXModel>;

export const ChargedBTCModel = z.object({
  id: z.string(),
  checkoutLink: z.string(),
  metadata: z.object({
    email: z.string().email(),
    orderID: z.string().optional(),
  }),
});
export type ChargedBTCModel = z.infer<typeof ChargedBTCModel>;

export class ListInstallmentsModel {
  brand!: string;
  total!: number;
}

export class InstallmentModel {
  installment!: number;
  has_interest?: boolean;
  value!: number;
  currency!: string;
  interest_percentage?: number;
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

import {
  CreatedCheckoutModel,
  GetCheckoutModel,
} from '../../data/model/Payment.model.';

export class Payment {
  cardName!: string;
  cardNumber!: string;
  expiryDate!: string;
  cvv!: string;
}

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

export enum PaymentMethod {
  'MP' = 'MP',
  'BTC' = 'BTC',
}

export class PaymentItems {
  id!: string;
  name!: string;
  price!: number;
  quantity!: number;
  imageUrl!: string;
  category_id!: string;
}

export class GetCheckout {
  email!: string;
  name!: string;
  surname!: string;
  identification!: Identification;
  coupon?: string;
  address!: Address;
  method!: PaymentMethod;
  items!: PaymentItems[];

  public static toModel(entity: GetCheckout): GetCheckoutModel {
    const model = new GetCheckoutModel();

    model.address = {
      city: entity.address.city,
      number: entity.address.number,
      state: entity.address.state,
      street: entity.address.street,
      zipCode: entity.address.zipCode,
      complement: entity.address.complement,
    };

    model.couponCode = entity.coupon;

    model.firstName = entity.name;

    model.identification = {
      number: entity.identification.number,
      type: entity.identification.type,
    };

    model.lastName = entity.surname;

    model.payerEmail = entity.email;

    model.items = entity.items;

    return model;
  }
}

export class CreatedCheckout {
  paymentLink!: string;

  public static fromModel(model: CreatedCheckoutModel): CreatedCheckout {
    const entity = new CreatedCheckout();

    entity.paymentLink = model.initPoint;

    return entity;
  }
}

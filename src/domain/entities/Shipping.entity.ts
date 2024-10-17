import {
  CalculatedShippingModel,
  CalculateShippingModel,
} from '../../data/model/Shipping.model';

export class CalculateShipping {
  postalCode!: string;

  static toModel(entity: CalculateShipping): CalculateShippingModel {
    const model = new CalculateShippingModel();

    model.postalCode = entity.postalCode;

    return model;
  }
}

class Company {
  id!: number;
  name!: string;
  picture!: string;
}

export class CalculatedShipping {
  id!: number;
  name!: string;
  price!: string;
  company!: Company;

  deliveryTime!: number;

  static fromModel(model: CalculatedShippingModel): CalculatedShipping {
    const entity = new CalculatedShipping();

    entity.id = model.id;

    entity.name = model.name;

    entity.price = model.price;

    entity.company = {
      id: model.company.id,
      name: model.company.name,
      picture: model.company.picture,
    };

    entity.deliveryTime = model.deliveryTime;

    return entity;
  }
}

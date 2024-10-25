import { CalculatedShippingModel } from '../../../data/model/Shipping.model';
import { ShippingRepository } from '../../../data/repositories/Shipping,repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import {
  CalculatedShipping,
  CalculateShipping,
} from '../../entities/Shipping.entity';

export type CalculateReq = CalculateShipping;

export type CalculateRes = Promise<
  Result<CalculatedShipping[], { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type CalculateShippingUseCase = UseCase<CalculateReq, CalculateRes>;

export class CalculateShippingUseCaseImpl implements CalculateShippingUseCase {
  constructor(private repository: ShippingRepository) {}

  async execute(req: CalculateReq): CalculateRes {
    const { result } = await this.repository.calculate(
      CalculateShipping.toModel({
        postalCode: req.postalCode,
      }),
    );

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    const shippingOptions = result.data;

    const cheapestOption = shippingOptions.reduce((prev, curr) =>
      parseFloat(curr.price) < parseFloat(prev.price) ? curr : prev,
    );

    const fastestOption = shippingOptions.reduce((prev, curr) =>
      curr.deliveryTime < prev.deliveryTime ? curr : prev,
    );

    const correiosOption = shippingOptions.find(
      (option) =>
        option.name.toLowerCase().includes('correios') ||
        option.name.toLowerCase().includes('sedex'),
    );

    const filteredOptions = [
      cheapestOption,
      fastestOption,
      correiosOption,
    ].filter((option, index, self) => option && self.indexOf(option) === index);

    return Result.Success(
      filteredOptions
        .filter((item): item is CalculatedShippingModel => item !== undefined)
        .map((item) => CalculatedShipping.fromModel(item)),
    );
  }
}

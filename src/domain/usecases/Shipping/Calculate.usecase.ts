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

    return Result.Success(
      result.data.map((item) => CalculatedShipping.fromModel(item)),
    );
  }
}

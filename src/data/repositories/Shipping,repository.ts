import { z } from 'zod';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  CalculatedShippingModel,
  CalculateShippingModel,
} from '../model/Shipping.model';

type CalculateReq = CalculateShippingModel;

type CalculateRes = Promise<
  Result<
    CalculatedShippingModel[],
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export interface ShippingRepository {
  calculate(req: CalculateReq): CalculateRes;
}

export class ShippingRepositoryImpl implements ShippingRepository {
  constructor(private api: RemoteDataSource) {}

  async calculate(req: CalculateReq): CalculateRes {
    try {
      const result = await this.api.post({
        url: `/shipping/calculate`,
        model: z.array(CalculatedShippingModel),
        body: req,
      });

      if (!result) {
        return Result.Error({ code: 'SERIALIZATION' });
      }

      return Result.Success(result);
    } catch (error) {
      console.error(error);
      return Result.Error({ code: 'UNKNOWN' });
    }
  }
}

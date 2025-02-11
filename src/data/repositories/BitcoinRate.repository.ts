import { ExceptionHandler } from '@/utils/ExceptionHandler';
import { DefaultResultError, Result } from '@/utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import { ListedBitcoinRateModel } from '../model/BitcoinRate.model';

export type ListReq = object;

export type ValidateRes = Promise<
  Result<ListedBitcoinRateModel, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface BitcoinRateRepository {
  list(req: ListReq): ValidateRes;
}

export class BitcoinRateRepositoryImpl implements BitcoinRateRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async list(): ValidateRes {
    const result = await this.api.get({
      url: `/price?ids=bitcoin&vs_currencies=brl`,
      model: ListedBitcoinRateModel,
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}

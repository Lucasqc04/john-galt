import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import { ListAddressModel, ListedAddressModel } from '../model/Address.model';

export type ListReq = ListAddressModel;

export type ValidateRes = Promise<
  Result<ListedAddressModel, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export interface AddressRepository {
  list(req: ListReq): ValidateRes;
}

export class AddressRepositoryImpl implements AddressRepository {
  constructor(private api: RemoteDataSource) {}

  async list(req: ListReq): ValidateRes {
    try {
      const result = await this.api.post({
        url: `/address/list`,
        model: ListedAddressModel,
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

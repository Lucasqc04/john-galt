import { BitcoinRateRepository } from '@/data/repositories/BitcoinRate.repository';
import { ListedBitcoinRate } from '@/domain/entities/bitcoin/Rate.entity';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';

export type ListReq = object;

export type ValidateRes = Promise<
  Result<
    ListedBitcoinRate,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { code: 'SERIALIZATION'; payload: any } | DefaultResultError
  >
>;

export type ListBitcoinRateUseCase = UseCase<ListReq, ValidateRes>;

export class ListBitcoinRateUseCaseImpl implements ListBitcoinRateUseCase {
  constructor(private repository: BitcoinRateRepository) {}

  async execute(): ValidateRes {
    const { result } = await this.repository.list({});

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({
            code: 'SERIALIZATION',
            payload: 'ERRO DE VALIDAÇÃO',
          });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(ListedBitcoinRate.fromModel(result.data));
  }
}

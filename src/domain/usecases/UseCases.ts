import { RemoteDataSource } from '@/data/datasource/Remote.datasource';
import { BitcoinRateRepositoryImpl } from '@/data/repositories/BitcoinRate.repository';
import { ListBitcoinRateUseCaseImpl } from './bitcoin/list-rate.usecase';

// We'll use a generic RemoteDataSource that will be updated with the proper URL in the repository
const remoteAPI = new RemoteDataSource();

const BitcoinRateRepository = new BitcoinRateRepositoryImpl(remoteAPI);

export const usecases = {
  bitcoinRate: {
    list: new ListBitcoinRateUseCaseImpl(BitcoinRateRepository),
  },
};

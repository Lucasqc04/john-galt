import { RemoteDataSource } from '@/data/datasource/Remote.datasource';
import { BitcoinRateRepositoryImpl } from '@/data/repositories/BitcoinRate.repository';
import { ListBitcoinRateUseCaseImpl } from './bitcoin/list-rate.usecase';

const CoingeckoUrl = 'https://api.coingecko.com/api/v3/simple';

const coingeckoAPI = new RemoteDataSource(CoingeckoUrl);

const BitcoinRateRepository = new BitcoinRateRepositoryImpl(coingeckoAPI);

export const usecases = {
  bitcoinRate: {
    list: new ListBitcoinRateUseCaseImpl(BitcoinRateRepository),
  },
};

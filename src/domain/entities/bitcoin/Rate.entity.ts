import { ListedBitcoinRateModel } from '@/data/model/BitcoinRate.model';

export class ListedBitcoinRate {
  bitcoin!: {
    brl: number;
  };

  static fromModel(model: ListedBitcoinRateModel): ListedBitcoinRate {
    const entity = new ListedBitcoinRate();

    entity.bitcoin = {
      brl: model.bitcoin.brl,
    };

    return entity;
  }
}

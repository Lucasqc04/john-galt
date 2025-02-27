import { ListedCryptoRateModel } from '@/data/model/BitcoinRate.model';

export class ListedCryptoRate {
  bitcoin: { brl: number };
  tether: { brl: number };

  constructor() {
    this.bitcoin = { brl: 0 };
    this.tether = { brl: 0 };
  }

  static fromModel(model: ListedCryptoRateModel): ListedCryptoRate {
    const entity = new ListedCryptoRate();
    entity.bitcoin = { brl: model.bitcoin.brl };
    entity.tether = { brl: model.tether.brl };
    return entity;
  }
}

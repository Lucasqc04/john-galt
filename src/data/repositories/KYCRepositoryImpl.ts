import { KYC } from '../../domain/entities/KYC';
import { KYCDataSource } from '../datasource/RemoteKYCDataSource';
export interface KYCRepository {
  submit(data: KYC): Promise<void>;
}

export class KYCRepositoryImpl implements KYCRepository {
  constructor(private dataSource: KYCDataSource) {}

  async submit(data: KYC): Promise<void> {
    await this.dataSource.submitKYC(data);
  }
}

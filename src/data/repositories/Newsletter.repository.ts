import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultError, Result } from '../../utils/Result';
import { RemoteDataSource } from '../datasource/Remote.datasource';
import {
  InsertedNewsletterModel,
  InsertNewsletterModel,
} from '../model/Newsletter.model';

export type InsertReq = InsertNewsletterModel;

export type InsertRes = Promise<
  Result<
    InsertedNewsletterModel,
    { code: 'SERIALIZATION' } | DefaultResultError
  >
>;

export interface NewsletterRepository {
  insert(req: InsertReq): InsertRes;
}

export class NewsletterRepositoryImpl implements NewsletterRepository {
  constructor(private api: RemoteDataSource) {}

  @ExceptionHandler()
  async insert(req: InsertReq): InsertRes {
    const result = await this.api.post({
      url: `/newsletter/create`,
      model: InsertedNewsletterModel,
      body: req,
    });

    if (!result) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    return Result.Success(result);
  }
}

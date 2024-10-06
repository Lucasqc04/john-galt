import { NewsletterRepository } from '../../../data/repositories/Newsletter.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import {
  InsertedNewsletter,
  InsertNewsletter,
} from '../../entities/Newsletter.entity';

export type InsertReq = InsertNewsletter;

export type InsertRes = Promise<
  Result<InsertedNewsletter, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type InsertNewsletterUseCase = UseCase<InsertReq, InsertRes>;

export class InsertNewsletterUseCaseImpl implements InsertNewsletterUseCase {
  constructor(private repository: NewsletterRepository) {}

  async execute(req: InsertReq): InsertRes {
    const { result } = await this.repository.insert(req);

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(InsertedNewsletter.fromModel(result.data));
  }
}

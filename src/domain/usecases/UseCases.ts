import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { NewsletterRepositoryImpl } from '../../data/repositories/Newsletter.repository';
import { InsertNewsletterUseCaseImpl } from './Newsletter/insert.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);

const NewsletterRepository = new NewsletterRepositoryImpl(api);

export const UseCases = {
  newsletter: {
    insert: new InsertNewsletterUseCaseImpl(NewsletterRepository),
  },
};

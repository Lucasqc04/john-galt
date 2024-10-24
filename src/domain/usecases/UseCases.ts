import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { NewsletterRepositoryImpl } from '../../data/repositories/Newsletter.repository';
import { PaymentRepositoryImpl } from '../../data/repositories/Payment.repository';
import { ShippingRepositoryImpl } from '../../data/repositories/Shipping,repository';
import { InsertNewsletterUseCaseImpl } from './Newsletter/insert.usecase';
import { CreatePaymentUseCaseImpl } from './Payment/Create.usecase';
import { CalculateShippingUseCaseImpl } from './Shipping/Calculate.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);

const NewsletterRepository = new NewsletterRepositoryImpl(api);
const ShippingRepository = new ShippingRepositoryImpl(api);
const PaymentRepository = new PaymentRepositoryImpl(api);

export const UseCases = {
  newsletter: {
    insert: new InsertNewsletterUseCaseImpl(NewsletterRepository),
  },
  shipping: {
    calculate: new CalculateShippingUseCaseImpl(ShippingRepository),
  },
  payment: {
    create: new CreatePaymentUseCaseImpl(PaymentRepository),
  },
};

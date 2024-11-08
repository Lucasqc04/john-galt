import { EfiDatasourceImpl } from '../../data/datasource/Efi.datasource';
import { RemoteDataSource } from '../../data/datasource/Remote.datasource';
import { AddressRepositoryImpl } from '../../data/repositories/Address.repository';
import { CouponRepositoryImpl } from '../../data/repositories/Coupon.repository';
import { NewsletterRepositoryImpl } from '../../data/repositories/Newsletter.repository';
import { PaymentRepositoryImpl } from '../../data/repositories/Payment.repository';
import { ShippingRepositoryImpl } from '../../data/repositories/Shipping,repository';
import { ListAddressUseCaseImpl } from './Address/List.usecase';
import { ValidateCouponUseCaseImpl } from './Coupons/validate.usecase';
import { InsertNewsletterUseCaseImpl } from './Newsletter/insert.usecase';
import { CreatePaymentUseCaseImpl } from './Payment/Create.usecase';
import { CalculateDiscountUseCaseImpl } from './Payment/Discount.usecase';
import { IdentifyBrandUseCaseImpl } from './Payment/IdentifyBrand.usecase';
import { ListInstallmentsUseCaseImpl } from './Payment/ListInstallments.usecase';
import { CalculateShippingUseCaseImpl } from './Shipping/Calculate.usecase';

const API_URL = String(import.meta.env.VITE_API_URL);

const api = new RemoteDataSource(API_URL);
const efi = new EfiDatasourceImpl();

const NewsletterRepository = new NewsletterRepositoryImpl(api);
const ShippingRepository = new ShippingRepositoryImpl(api);
const PaymentRepository = new PaymentRepositoryImpl(api, efi);
const CouponRepository = new CouponRepositoryImpl(api);
const AddressRepository = new AddressRepositoryImpl(api);

export const UseCases = {
  newsletter: {
    insert: new InsertNewsletterUseCaseImpl(NewsletterRepository),
  },
  shipping: {
    calculate: new CalculateShippingUseCaseImpl(ShippingRepository),
  },
  payment: {
    create: new CreatePaymentUseCaseImpl(PaymentRepository),
    calculate: {
      discount: new CalculateDiscountUseCaseImpl(),
    },
    indentifyBrand: new IdentifyBrandUseCaseImpl(PaymentRepository),
    listInstallments: new ListInstallmentsUseCaseImpl(PaymentRepository),
  },
  coupon: {
    validate: new ValidateCouponUseCaseImpl(CouponRepository),
  },
  address: {
    list: new ListAddressUseCaseImpl(AddressRepository),
  },
};

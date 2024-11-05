import { format, getYear, parse } from 'date-fns';
import { PaymentRepository } from '../../../data/repositories/Payment.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import {
  CreatedCheckout,
  GetCheckout,
  Installment,
} from '../../entities/payment.entity';

export type CreateReq = GetCheckout;

export type CreateRes = Promise<
  Result<CreatedCheckout, { code: 'SERIALIZATION' } | DefaultResultError>
>;

export type CreatePaymentUseCase = UseCase<CreateReq, CreateRes>;

export class CreatePaymentUseCaseImpl implements CreatePaymentUseCase {
  constructor(private repository: PaymentRepository) {}

  async execute(req: CreateReq): CreateRes {
    const validationResult = GetCheckout.safeParse(req);

    if (!validationResult.success) {
      return Result.Error({ code: 'SERIALIZATION' });
    }

    const parsedResult = validationResult.data;

    const parsedInstallments = parsedResult.installments.map((item) =>
      Installment.toModel(item),
    );

    const expiryDate = parsedResult.expiryDate;

    const [expirationMonth, expirationYear] = expiryDate.split('/');

    const currentYear = getYear(new Date());
    const currentCentury = Math.floor(currentYear / 100);

    const fullExpirationYear = `${currentCentury}${expirationYear}`;

    const parsedDate = parse(parsedResult.birthday, 'dd/MM/yyyy', new Date());

    const parsedBirthday = format(parsedDate, 'yyyy-MM-dd');

    const { result } = await this.repository.create(
      {
        address: parsedResult.address,
        firstName: parsedResult.firstName,
        identification: parsedResult.identification,
        items: parsedResult.items,
        lastName: parsedResult.lastName,
        payerEmail: parsedResult.payerEmail,
        phone: parsedResult.phone,
        couponCode: parsedResult.couponCode,
        brand: parsedResult.brand,
        cardName: parsedResult.cardName,
        cardNumber: parsedResult.cardNumber,
        cvv: parsedResult.cvv,
        installments: parsedInstallments,
        selectInstallments: parsedResult.selectInstallments,
        total: parsedResult.total,
        expirationMonth,
        expirationYear: fullExpirationYear,
        birthday: parsedBirthday,
      },
      req.method,
    );

    if (result.type === 'ERROR') {
      switch (result.error.code) {
        case 'SERIALIZATION':
          return Result.Error({ code: 'SERIALIZATION' });
        default:
          return Result.Error({ code: 'UNKNOWN' });
      }
    }

    return Result.Success(CreatedCheckout.fromModel(result.data));
  }
}

import { PaymentRepository } from '../../../data/repositories/Payment.repository';
import { DefaultResultError, Result } from '../../../utils/Result';
import { UseCase } from '../../../utils/UseCase';
import { Installment, ListInstallments } from '../../entities/payment.entity';

export type ListInstallmentsReq = ListInstallments;

export type ListInstallmentsRes = Promise<
  Result<Installment[], DefaultResultError>
>;

export type ListInstallmentsUseCase = UseCase<
  ListInstallmentsReq,
  ListInstallmentsRes
>;

export class ListInstallmentsUseCaseImpl implements ListInstallmentsUseCase {
  constructor(private repository: PaymentRepository) {}

  async execute(req: ListInstallmentsReq): ListInstallmentsRes {
    const { result } = await this.repository.listInstallments(
      ListInstallments.toModel(req),
    );

    if (result.type === 'ERROR') {
      return Result.Error({ code: 'UNKNOWN' });
    }

    return Result.Success(
      result.data.installments.map((item) => Installment.fromModel(item)),
    );
  }
}

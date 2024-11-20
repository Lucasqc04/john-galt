import { useFormContext } from 'react-hook-form';
import { GetCheckout } from '../../../../domain/entities/payment.entity';

export function ConfirmInfos() {
  const form = useFormContext<GetCheckout>();

  const infos = form.getValues();

  const formatCurrency = (value: number | string | undefined) => {
    if (value === undefined || value === null || isNaN(Number(value))) {
      return '0,00';
    }
    return Number(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b border-solid border-black pb-4">
        <h2 className="text-2xl leading-6">
          {infos.firstName} {infos.lastName}
        </h2>
        <span>{infos.payerEmail}</span>
        <span>Data de Nascimento: {infos.birthday}</span>
        <span>
          {infos.identification.type}: {infos.identification.number}
        </span>
        <span>
          +55 ({infos.phone.areaCode}) {infos.phone.number}
        </span>
      </div>
      <div className="flex flex-col border-b border-solid border-black py-4">
        <span>
          Endereço: {infos.address.street}, {infos.address.number} -{' '}
          {infos.address.complement}
        </span>
        <span>CEP: {infos.address.zipCode}</span>
        <span>
          Estado: {infos.address.state}, {infos.address.uf}
        </span>
        <span>Bairro: {infos.address.neighborhood}</span>
      </div>
      <div className="flex flex-col border-b border-solid border-black py-4">
        <span>Valor Total: R$ {formatCurrency(infos.total)}</span>
        {infos.shipping && (
          <span>
            {infos.shipping.name}: R$ {formatCurrency(infos.shipping.price)}.
            Entrega em: {infos.shipping.deliveryTime} dias
          </span>
        )}
        <span>
          Pagamento: {infos.selectedPaymentLabel}{' '}
          {infos.paymentOption === 'creditCard' &&
            `- ${infos.selectInstallments}X`}
        </span>
      </div>
    </div>
  );
}

import { GetCheckout } from '../../domain/entities/payment.entity';

export function redirectToWhatsApp(
  data: GetCheckout,
  shipping: number,
  total: number,
) {
  const phoneNumber = '5511919050416';

  const itemsText =
    data.items && Array.isArray(data.items)
      ? data.items
          .map((item) => `${item.name}, na quantidade de ${item.quantity}`)
          .join('\n')
      : 'Nenhum item encontrado';

  const text = `Olá, meu nome é ${data.firstName} ${data.lastName}. Houve um erro no pagamento via site e gostaria de finalizar meu pedido.

  Endereço: ${data.address.street}, ${data.address.number}, ${data.address.complement} - ${data.address.city}/${data.address.state} - ${data.address.uf}
  Items: ${itemsText}
  Valor de Frete: ${shipping ?? 'não informado'}
  Total: ${total ?? 'não informado'}
  Cupom: ${data.couponCode ?? 'não informado'}`;

  const encodedText = encodeURIComponent(text);
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

  window.location.href = whatsappURL;
}

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category_id: string;
  description: string;
}

interface Identification {
  type: 'CPF' | 'CNPJ';
  number: string;
}

interface CheckoutForm {
  couponCode?: string;
  payerEmail: string;
  firstName: string;
  lastName: string;
  identification: Identification;
  items: Item[];
}

export function Checkout() {
  const API_URL = String(import.meta.env.VITE_API_URL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const [paymentMethod, setPaymentMethod] = useState<string>('MP');

  const onSubmit = async (data: CheckoutForm) => {
    try {
      // Ajusta os dados de pagamento para a estrutura esperada pela API
      const paymentData = {
        couponCode: data.couponCode,
        paymentMethod,
        items: data.items,
        payerEmail: data.payerEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        identification: data.identification,
      };

      const response = await axios.post(
        `${API_URL}create-payment/${paymentMethod}`,
        paymentData,
      );
      console.log(API_URL);
      // Verifica se a URL de pagamento foi retornada
      if (response.data.paymentUrl) {
        // Redireciona o cliente para a página de pagamento do Mercado Pago
        window.location.href = response.data.paymentUrl;
      } else {
        alert('Pagamento não foi aprovado.');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento', error);
      alert('Ocorreu um erro ao processar o pagamento.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo de Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email do Pagador
            </label>
            <input
              type="email"
              {...register('payerEmail', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.payerEmail && (
              <span className="text-red-500 text-sm">
                Este campo é obrigatório
              </span>
            )}
          </div>

          {/* Campo de Primeiro Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primeiro Nome
            </label>
            <input
              type="text"
              {...register('firstName', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                Este campo é obrigatório
              </span>
            )}
          </div>

          {/* Campo de Sobrenome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sobrenome
            </label>
            <input
              type="text"
              {...register('lastName', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                Este campo é obrigatório
              </span>
            )}
          </div>

          {/* Identificação */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Identificação
            </label>
            <select
              {...register('identification.type', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
            {errors.identification?.type && (
              <span className="text-red-500 text-sm">
                Este campo é obrigatório
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Identificação
            </label>
            <input
              type="text"
              {...register('identification.number', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.identification?.number && (
              <span className="text-red-500 text-sm">
                Este campo é obrigatório
              </span>
            )}
          </div>

          {/* Método de Pagamento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de Pagamento
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="MP">Mercado Pago</option>
              <option value="BTC">Bitcoin</option>
            </select>
          </div>

          {/* Campo de Cupom */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código do Cupom
            </label>
            <input
              type="text"
              {...register('couponCode')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Itens do Checkout */}
          <div>
            <h2 className="text-lg font-bold">Itens no Carrinho</h2>
            <ul>
              {/* Exemplos de itens, você pode substituir isso pela lógica do seu carrinho */}
              <li>ID: 123 - Produto A - Quantidade: 2 - Preço: R$50</li>
              <li>ID: 456 - Produto B - Quantidade: 1 - Preço: R$30</li>
            </ul>
          </div>

          {/* Botão de Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md font-semibold hover:bg-blue-600"
            >
              Finalizar Pagamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

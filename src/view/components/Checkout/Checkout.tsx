import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Identification {
  type: 'CPF' | 'CNPJ';
  number: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CheckoutForm {
  payerEmail: string;
  firstName: string;
  lastName: string;
  identification: Identification;
  couponCode?: string;
  orderID: string;
}

export function Checkout() {
  const API_URL = String(import.meta.env.VITE_API_URL);
  const [paymentMethod, setPaymentMethod] = useState<'MP' | 'BTC'>('MP');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutForm>();

  const onSubmit: SubmitHandler<CheckoutForm> = async (data) => {
    const cartItems: Product[] = JSON.parse(
      localStorage.getItem('cartItems') || '[]',
    );

    const items = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      category_id: 'KIT DE TECNOLOGIA',
      description: item.name,
    }));

    const orderID = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const requestData = {
      couponCode: data.couponCode || '',
      items,
      payerEmail: data.payerEmail,
      firstName: data.firstName,
      lastName: data.lastName,
      identification: {
        type: data.identification.type,
        number: data.identification.number,
      },
      orderID,
    };

    try {
      const response = await axios.post(
        `${API_URL}create-payment/${paymentMethod}`,
        requestData,
      );
      console.log('Pagamento realizado com sucesso:', response.data);
      alert('Pagamento realizado com sucesso!');

      if (response.data.initPoint) {
        window.location.href = response.data.initPoint;
      } else {
        alert('Pagamento não foi aprovado');
      }

      reset();
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 mt-20">
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
              {...register('payerEmail', {
                required: 'Este campo é obrigatório',
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.payerEmail && (
              <span className="text-red-500 text-sm">
                {errors.payerEmail.message}
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
              {...register('firstName', {
                required: 'Este campo é obrigatório',
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
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
              {...register('lastName', {
                required: 'Este campo é obrigatório',
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>

          {/* Identificação */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Identificação
            </label>
            <select
              {...register('identification.type', {
                required: 'Este campo é obrigatório',
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
            </select>
          </div>

          {/* Número de Identificação */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Identificação
            </label>
            <input
              type="text"
              {...register('identification.number', {
                required: 'Este campo é obrigatório',
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.identification?.number && (
              <span className="text-red-500 text-sm">
                {errors.identification.number.message}
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
              onChange={(e) => setPaymentMethod(e.target.value as 'MP' | 'BTC')}
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

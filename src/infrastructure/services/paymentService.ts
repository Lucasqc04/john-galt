import { Order } from '../../domain/entities/Order';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { axiosInstance } from '../api/axiosInstance';

export type OrderProps = Order;

class PaymentService {
  @ExceptionHandler()
  async createOrder(orderData: OrderProps): Promise<OrderProps> {
    const response = await axiosInstance.post(
      '/orders/create-order',
      orderData,
    );
    return response.data;
  }
}

export const paymentService = new PaymentService();

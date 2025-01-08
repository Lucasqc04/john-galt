export interface Order {
  id?: string;
  realValue: number;
  bitcoinValue: number;
  paymentMethod: string;
  network: string;
  phone: string;
  coldWalletId: string;
  coupon?: string;
}

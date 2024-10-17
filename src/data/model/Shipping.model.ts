import { z } from 'zod';

export class CalculateShippingModel {
  postalCode!: string;
}

const Company = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.string(),
});

const DeliveryRange = z.object({
  max: z.number(),
  min: z.number(),
});

const AdditionalServices = z.object({
  collect: z.boolean(),
  ownHand: z.boolean(),
  receipt: z.boolean(),
});

export const CalculatedShippingModel = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  price: z.string(),
  company: Company,
  discount: z.string(),
  currency: z.string(),
  deliveryTime: z.number(),
  customPrice: z.string(),
  customDeliveryTime: z.number(),
  deliveryRange: DeliveryRange,
  additionalServices: AdditionalServices,
});
export type CalculatedShippingModel = z.infer<typeof CalculatedShippingModel>;

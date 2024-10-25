import { z } from 'zod';

export class ListAddressModel {
  postalCode!: string;
}

export const ListedAddressModel = z.object({
  postalCode: z.string().min(1),
  street: z.string().min(1),
  complement: z.string().optional(),
  unit: z.string().optional(),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  uf: z.string().length(2),
  state: z.string().min(1),
  regions: z.string().min(1),
  ibgeCode: z.string().min(1),
  gia: z.string().optional(),
  ddd: z.string().min(1),
  siafi: z.string().min(1),
});
export type ListedAddressModel = z.infer<typeof ListedAddressModel>;

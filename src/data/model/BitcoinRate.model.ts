import { z } from 'zod';

export const ListedBitcoinRateModel = z.object({
  bitcoin: z.object({
    brl: z.number(),
  }),
});
export type ListedBitcoinRateModel = z.infer<typeof ListedBitcoinRateModel>;

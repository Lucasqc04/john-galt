import { z } from 'zod';

export const ListedCryptoRateModel = z.object({
  bitcoin: z.object({
    brl: z.number(),
  }),
  tether: z.object({
    brl: z.number(),
  }),
});

export type ListedCryptoRateModel = z.infer<typeof ListedCryptoRateModel>;

import { z } from 'zod';

export class InsertNewsletterModel {
  email!: string;
}

export const InsertedNewsletterModel = z.object({
  id: z.string(),
});
export type InsertedNewsletterModel = z.infer<typeof InsertedNewsletterModel>;

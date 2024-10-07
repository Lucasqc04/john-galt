import { z } from 'zod';
import { InsertedNewsletterModel } from '../../data/model/Newsletter.model';

export const InsertNewsletter = z.object({
  email: z.string().email().min(1),
});
export type InsertNewsletter = z.infer<typeof InsertNewsletter>;

export class InsertedNewsletter {
  id!: string;

  public static fromModel(model: InsertedNewsletterModel): InsertedNewsletter {
    const entity = new InsertedNewsletter();

    entity.id = model.id;

    return entity;
  }
}

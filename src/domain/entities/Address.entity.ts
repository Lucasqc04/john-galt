import { z } from 'zod';
import { ListedAddressModel } from '../../data/model/Address.model';

export const ListAddress = z.object({
  postalCode: z.string().min(1),
});
export type ListAddress = z.infer<typeof ListAddress>;

export class ListedAddress {
  postalCode!: string;
  street!: string;
  neighborhood!: string;
  city!: string;
  uf!: string;
  state!: string;
  regions!: string;
  ibgeCode!: string;
  ddd!: string;
  siafi!: string;
  complement?: string;
  unit?: string;
  gia?: string;

  public static fromModel(model: ListedAddressModel): ListedAddress {
    const entity = new ListedAddress();

    entity.postalCode = model.postalCode;
    entity.street = model.street;
    entity.neighborhood = model.neighborhood;
    entity.city = model.city;
    entity.uf = model.uf;
    entity.state = model.state;
    entity.regions = model.regions;
    entity.ibgeCode = model.ibgeCode;
    entity.ddd = model.ddd;
    entity.siafi = model.siafi;
    entity.complement = model.complement;
    entity.unit = model.unit;
    entity.gia = model.gia;

    return entity;
  }
}

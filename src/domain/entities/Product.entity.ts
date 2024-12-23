export class Item {
  quantity!: number;
  description!: string;
}

export class Product {
  id!: string;
  name!: string;
  title!: string;
  description!: string;
  originalPrice!: number;
  price!: number;
  images!: string[];
  items?: Item[];
  resources!: string[];
  sku?: string;
  sku_id?: number;
  Yampi_Product_id?: number;
}

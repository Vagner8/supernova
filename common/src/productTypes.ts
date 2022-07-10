import { ImgsType } from "./commonTypes";

interface ProductCardType {
  name: string;
  price: string;
  description: string;
}

interface ProductProfilePointsType {
  description: string;
  parameters: [string, string][]
}

interface ProductSettingsType {
  category: 'new' | 'dress' | 'trips' | 'devices'
  currency: string;
  disabled: boolean;
  discount: string;
  discountStart: string;
  discountEnd: string;
}

export interface ProductImgsType extends ImgsType {}

export interface ProductType {
  _id: Object;
  productId: string;
  selected?: boolean;
  created: string;

  card: ProductCardType;
  profile: ProductProfilePointsType;
  settings: ProductSettingsType;
  imgs: ProductImgsType;
}

export type ProductProfileType = Omit<ProductType, '_id' | 'selected'>
export type ProductProfileKeys = keyof ProductProfileType

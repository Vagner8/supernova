import { ImgsType } from "./commonTypes";

export interface ProductCardType {
  name: string;
  price: string;
  description: string;
}

export interface ProductProfilePointsType {
  description: string;
  parameters: [string, string][]
}

export interface ProductSettingsType {
  category: 'New' | 'Dress' | 'Trips' | 'Devices'
  currency: string;
  disabled: boolean;
  discount: string;
  discountStart: string;
  discountEnd: string;
}

export interface ProductImgsType extends ImgsType {}

export interface ProductType {
  _id: string;
  productId: string;
  selected?: boolean;
  created: string;

  card: ProductCardType;
  profile: ProductProfilePointsType;
  settings: ProductSettingsType;
  imgs: ProductImgsType;
}

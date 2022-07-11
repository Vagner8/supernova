import { BaseType } from "./commonTypes";

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

export interface ProductType extends BaseType {
  card: ProductCardType;
  profile: ProductProfilePointsType;
  settings: ProductSettingsType;
}

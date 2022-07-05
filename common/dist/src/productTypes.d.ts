import { ImgsType } from "./commonTypes";
interface ProductCardType {
    name: string;
    price: string;
    description: string;
}
interface ProductProfileType {
    description: string;
    parameters: [string, string][];
}
interface ProductSettingsType {
    category: 'dress' | 'trips' | 'devices';
    currency: string;
    disabled: boolean;
    discount: string;
    discountStart: string;
    discountEnd: string;
}
export interface ProductImgsType extends ImgsType {
}
export interface ProductType {
    _id: Object;
    productId: string;
    selected?: boolean;
    timestamp: string;
    card: ProductCardType;
    profile: ProductProfileType;
    settings: ProductSettingsType;
    imgs: ProductImgsType;
}
export {};
//# sourceMappingURL=productTypes.d.ts.map
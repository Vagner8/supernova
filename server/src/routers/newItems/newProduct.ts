import { ProductType } from "../../../../common/src/productTypes";

export type NewProductType = Omit<ProductType, "_id" | "productId" | "created">;

export const newProduct: NewProductType = {
  card: {
    name: "",
    price: "",
    description: "",
  },
  profile: {
    description: "",
    parameters: []
  },
  settings: {
    category: 'new',
    currency: "",
    disabled: false,
    discount: "0",
    discountStart: "",
    discountEnd: "",
  },
  imgs: {
    avatar: [],
    photos: [],
  },
};

import { ProductType } from "../../../../common/src/productTypes";

export type NewProductType = Omit<ProductType, "_id" | "productId">;

export const newProduct: NewProductType = {
  created: "",
  card: {
    name: "",
    price: "",
    description: "",
  },
  profile: {
    description: "",
    parameters: [],
  },
  settings: {
    category: "New",
    currency: "usd",
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

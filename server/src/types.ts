export enum DataBase {
  Supernova = "supernova",
}

export enum CollectionName {
  Users = "users",
  Products = "products"
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
    }
  }
}
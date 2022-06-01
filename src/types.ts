export enum DataBase {
  SuperAdmin = "super-admin",
}

export enum CollName {
  Users = "users",
  Owners = "owners"
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
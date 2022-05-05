import { MongoClient } from "mongodb";
import { throwError } from "./../share/errorHandlers";
import { url } from "./settings";
import { Collections, DataBase } from "./types";

class useDataBase {
  public client = new MongoClient(url);
  constructor(public dataBase: DataBase) {}

  public async connectDB() {
    try {
      await this.client.connect();
      return this.client.db(this.dataBase);
    } catch {
      throwError(this.connectDB.name, this.dataBase)
    }
  }

  public async find(collectionName: Collections) {
    try {
      const db = await this.connectDB();
      const collection = db.collection(collectionName)
      return collection.find()
    } catch {
      throwError(this.find.name)
    }
  }

  public async close() {
    await this.client.close();
  }
}

export const useSuperAdmin = new useDataBase(DataBase.SuperAdmin);

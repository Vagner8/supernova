import { MongoClient } from "mongodb";
import { url } from "./dbSettings";
import { Collections, DataBase } from "./types";

class UseDB {
  public client = new MongoClient(url);
  constructor(public dataBase: DataBase) {}

  public async getCollection<T>(collectionName: Collections) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dataBase);
      return db.collection<T>(collectionName)
    } catch (err) {
      console.log(err)
    }
  }

  public async close() {
    await this.client.close();
  }
}

export const useSuperAdmin = new UseDB(DataBase.SuperAdmin);
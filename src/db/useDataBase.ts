import { MongoClient } from "mongodb";
import { url } from "./settings";
import { Collections, DataBase } from "./types";

export class UseDB {
  public client = new MongoClient(url);
  constructor(public dataBase: DataBase) {}

  public async getCollection<C>(collectionName: Collections) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dataBase);
      return db.collection<C>(collectionName)
    } catch (err) {
      console.log(err)
    }
  }

  public async close() {
    await this.client.close();
  }
}

export const useSuperAdmin = new UseDB(DataBase.SuperAdmin);
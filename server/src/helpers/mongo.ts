import { Db, MongoClient } from "mongodb";
import { DataBase } from "../types";

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const url = `mongodb+srv://vagner:${password}@supernova.1nqe9.mongodb.net/?retryWrites=true&w=majority`

export function mongoConnection() {
  let db: Db | null = null
  return async function() {
    if (db) return db
    console.log('Mongo db connected')
    const client = new MongoClient(url)
    await client.connect();
    db = client.db(DataBase.Supernova);
    return db
  }
}
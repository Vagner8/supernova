import { MongoClient } from "mongodb";
import { throwError } from "./../share/errorHandlers";
import { newUser } from "./data/usersData";
import { url } from "./settings";
import { DataBase, LookupQuery, User, UsersCollections } from "./usersTypes";

type NewData = User;

class useDataBase {
  public client = new MongoClient(url);
  constructor(public dataBase: DataBase, public newData: NewData) {}

  public async connectDB() {
    try {
      await this.client.connect();
      return this.client.db(this.dataBase);
    } catch {
      throwError(this.connectDB.name, this.dataBase)
    }
  }

  public async createDB() {
    try {
      const db = await this.connectDB();
      for await (let [key, value] of Object.entries(newUser)) {
        let collection = db.collection(key);
        await collection.insertOne(value, {
          writeConcern: { w: "majority", wtimeout: 5000 },
        });
      }
    } catch {
      throwError(this.createDB.name)
    }
  }

  public async aggregate(
    query: LookupQuery[],
    collectionName: UsersCollections
  ) {
    const db = await this.connectDB();
    const collection = db.collection(collectionName);
    return collection.aggregate(query);
  }

  public async find(collectionName: string) {
    try {
      const db = await this.connectDB();
      const collection = db.collection(collectionName)
      return collection.find()
    } catch {
      throwError(this.createDB.name)
    }
  }

  // public async findOne(query: Object, options: any) {
  //   try {
  //     const collection = await this.run();
  //     return collection.findOne(query, options);
  //   } catch (err) {
  //     console.dir(err);
  //   }
  // }

  // public async insertUsers() {
  //   try {
  //     const collection = await this.run();
  //     collection.insertMany(users);
  //   } catch (err) {}
  // }

  // public async lookup(query: Object[]) {
  //   try {
  //     const collection = await this.run();
  //     return collection.aggregate(query)
  //   } catch (err) {
  //     console.dir(err);
  //   }
  // }

  public async close() {
    await this.client.close();
  }
}

export const useUsersDB = new useDataBase(DataBase.Users, newUser);

// import { MongoClient } from "mongodb";
// import { url } from "./settings";
// import { CollName, DataBase, Owner } from "./types";
// export class UseDB<Coll> {
//   public client = new MongoClient(url);
//   constructor(public dataBase: DataBase) {}
//   public async connect(collectionName: CollName) {
//     try {
//       const a = await this.client.connect()
//       const db = this.client.db(this.dataBase);
//       return db.collection<Coll>(collectionName)
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   public async close() {
//     await this.client.close();
//   }
// }
// export const superAdmin = new UseDB<Owner>(DataBase.SuperAdmin);
//# sourceMappingURL=useDataBase.js.map
import { MONGO_DB } from "../middleware/connectMongo";
import { serverError } from "./errors";

class Mongo {
  getCollection<Coll>(nameCollection: string) {
    if (!MONGO_DB) throw serverError(`no data base connection`);
    const collection = MONGO_DB.collection<Coll>(nameCollection);
    if (!collection) throw serverError(`bad connection ${nameCollection}`);
    return collection;
  }
}

export const mongo = new Mongo();

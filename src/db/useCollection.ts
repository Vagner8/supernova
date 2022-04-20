import { MongoClient } from "mongodb";
import { url } from "./settings";
import { Clusters, Collections } from "./types";

class UseCollection {
  public client = new MongoClient(url);
  constructor(public cluster: Clusters, public collection: Collections) {}

  public async run() {
    try {
      await this.client.connect();
      const cluster = this.client.db(this.cluster);
      const collection = cluster.collection(this.collection);
      console.info(`Connected to collection: ${collection.collectionName}`);
      return collection
    } catch (err) {
      console.dir(err)
    }
  }

  public async find() {
    try {
      const collection = await this.run();
      return collection.find()
    } catch (err) {
      console.dir(err)
    }
  }

  public async close() {
    await this.client.close();
  }
}

export const usersCollection = new UseCollection(
  Clusters.ServerSuperAdmin,
  Collections.Users
);
export const dropListCollection = new UseCollection(
  Clusters.ServerSuperAdmin,
  Collections.DropList
);
export const testCollection = new UseCollection(
  Clusters.ServerSuperAdmin,
  Collections.Test
);

import { NextFunction, Request, Response } from "express";
import { Db, MongoClient } from "mongodb";
import { DataBase } from "./../types";
import { url } from "./../settings";

export let MONGO_DB: Db | null;

export const connectMongo =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (MONGO_DB) return next()
      const client = new MongoClient(url);
      await client.connect();
      MONGO_DB = client.db(DataBase.Supernova);
      setInterval(async () => {
        MONGO_DB = null
        await client.close()
      }, 1000 * 60 * 60)
      next()
    } catch (err) {
      next(err)
    }
  };

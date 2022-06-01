import "dotenv/config";
import express from "express";
import users from "./routers/usersRouters/usersRouters";
import auth from "./routers/authRouters/authRouters";
import owner from "./routers/ownerRouters/ownerRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validationMiddleware } from "./middleware/validationMiddleware";
import cookieParser from "cookie-parser";
import { accessMiddleware } from "./middleware/accessMiddleware";
import { Db, MongoClient } from "mongodb";
import { url } from "./settings";
import { DataBase } from "./types";

const app = express();

export let db: Db

app.use(cookieParser());
app.use(express.json());
app.use(validationMiddleware());
app.use("/auth", auth);
app.use(accessMiddleware());
app.use("/users", users);
app.use("/owner", owner);
app.use(errorMiddleware);

export const restartServer = async () => {
  const client = new MongoClient(url);
  await client.connect()
  db = client.db(DataBase.Supernova)
  app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
  });
}
restartServer()
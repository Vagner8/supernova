import "dotenv/config";
import express from "express";
import login from "./routers/loginRouters/loginRouters";
import user from "./routers/userRouters/userRouters";
import product from "./routers/productRouters/productRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validateMiddleware } from "./middleware/validateMiddleware";
import cookieParser from "cookie-parser";
import { accessMiddleware } from "./middleware/accessMiddleware";
import { Db } from "mongodb";
import { mongoConnection } from "./helpers/mongo";
// import { testMiddleware } from "./middleware/testMiddleware";

export const mongoDb = mongoConnection();
export let db: Db;

const app = express();

app.use(cookieParser());
app.use(express.json());
// app.use(testMiddleware())
app.use(validateMiddleware());
app.use("/login", login);
app.use(accessMiddleware());
app.use("/users", user);
app.use("/product", product);
app.use(errorMiddleware);

const serverStart = async () => {
  db = await mongoDb();
  app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
  });
};

serverStart();

import "dotenv/config";
import express from "express";
import login from "./routers/loginRouters/loginRouters";
import user from "./routers/userRouters/userRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validateMiddleware } from "./middleware/validateMiddleware";
import cookieParser from "cookie-parser";
import { accessMiddleware } from "./middleware/accessMiddleware";
import { connectMongo } from "./middleware/connectMongo";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(validateMiddleware());
app.use(connectMongo())
app.use("/login", login);
app.use(accessMiddleware());
app.use("/users", user);
app.use(errorMiddleware);

export const restartServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
  });
}
restartServer()
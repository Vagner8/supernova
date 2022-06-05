import "dotenv/config";
import express from "express";
import users from "./routers/usersRouters/usersRouters";
import auth from "./routers/authRouters/authRouters";
import owner from "./routers/ownerRouters/ownerRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validationMiddleware } from "./middleware/validationMiddleware";
import cookieParser from "cookie-parser";
import { accessMiddleware } from "./middleware/accessMiddleware";
import { connectMongo } from "./middleware/connectMongo";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(validationMiddleware());
app.use(connectMongo())
app.use("/auth", auth);
app.use(accessMiddleware());
app.use("/users", users);
app.use("/owner", owner);
app.use(errorMiddleware);

export const restartServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
  });
}
restartServer()
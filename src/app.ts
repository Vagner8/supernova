import "dotenv/config";
import express from "express";
import users from "./routers/usersRouters/usersRouters";
import auth from "./routers/authRouters/authRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validationMiddleware } from "./middleware/validationMiddleware";
import cookieParser from "cookie-parser";
import { tokenMiddleware } from "./middleware/tokenMiddleware";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(validationMiddleware());
app.use(tokenMiddleware())

app.use("/users", users);
app.use("/auth", auth);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${process.env.PORT}`);
});

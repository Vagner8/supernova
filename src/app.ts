import "dotenv/config";
import express from "express";
import users from "./routers/users";
import auth from "./routers/authRouters";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { validationMiddleware } from "./middleware/validationMiddleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(validationMiddleware());

app.use("/users", users);
app.use("/auth", auth);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on port ${process.env.PORT}`);
});

import express from "express";
import users from "./routers/users";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

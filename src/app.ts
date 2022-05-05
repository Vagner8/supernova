import 'dotenv/config'
import express from "express";
import users from "./routers/users";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});

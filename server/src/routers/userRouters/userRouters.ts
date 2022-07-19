import express from "express";
import { putUser } from "./putUser";
import { getUser } from "./getUser";
import { deleteUser } from "./deleteUser";
import { postUser } from "./postUser";

const router = express.Router();

router.get("/aggregate", getUser);
router.post("/new", postUser);
router.put("/update", putUser);
router.delete("/delete", deleteUser);

export default router;

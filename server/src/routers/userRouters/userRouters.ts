import express from "express";
import { getUserById } from "./getUserById";
import { putUser } from "./putUser";
import { postUser } from "./postUser";
import { getUserCertainData } from "./getUserCertainData";

const router = express.Router();

router.get("/", getUserById);
router.get("/aggregate", getUserCertainData);
router.post("/new", postUser);
router.put("/update", putUser);

export default router;

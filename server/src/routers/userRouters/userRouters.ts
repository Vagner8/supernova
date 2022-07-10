import express from "express";
import { putUser } from "./putUser";
import { getUser } from "./getUser";
import { deleteUser } from "./deleteUser";

const router = express.Router();

router.get("/aggregate", getUser);
router.put("/update", putUser);
router.delete("/delete", deleteUser);

export default router;

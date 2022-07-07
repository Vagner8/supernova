import express from "express";
import { putUser } from "./putUser";
import { getUser } from "./getUser";

const router = express.Router();

router.get("/aggregate", getUser);
router.put("/update", putUser);

export default router;

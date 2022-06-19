import express from "express";
import { getUserController } from "./getUserController";
import { updateUserController } from "./updateUserController";

const router = express.Router();

router.get("/", getUserController);
router.put("/update", updateUserController);

export default router;

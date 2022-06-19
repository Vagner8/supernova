import express from "express";
import { getUserController } from "./getUserController";
import { putUserController } from "./putUserController";
import { postUserController } from "./postUserController";

const router = express.Router();

router.get("/", getUserController);
router.post("/new", postUserController)
router.put("/update", putUserController);

export default router;

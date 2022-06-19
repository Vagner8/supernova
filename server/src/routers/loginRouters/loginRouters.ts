import express from "express";
import { loginController } from "./loginController";

const router = express.Router();

router.post("/", loginController);

export default router;

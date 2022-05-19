import express from "express";
import { registrationController } from "./registrationController";

const router = express.Router();

router.post("/registration", registrationController);

export default router;

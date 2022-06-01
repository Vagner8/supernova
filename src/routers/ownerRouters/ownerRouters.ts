import express from "express";
import { getOwner } from "./controllers/getOwner";

const router = express.Router();

router.get("/", getOwner);

export default router;

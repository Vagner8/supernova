import express from "express";
import { getProductCertainData } from "./getProductCertainData";

const router = express.Router();

router.get("/aggregate", getProductCertainData);

export default router;
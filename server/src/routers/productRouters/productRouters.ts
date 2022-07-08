import express from "express";
import { getProduct } from "./getProduct";

const router = express.Router();

router.get("/aggregate", getProduct);

export default router;
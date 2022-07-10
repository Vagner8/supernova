import express from "express";
import { getProduct } from "./getProduct";
import { putProduct } from "./putProduct";

const router = express.Router();

router.get("/aggregate", getProduct);
router.put("/update", putProduct);

export default router;

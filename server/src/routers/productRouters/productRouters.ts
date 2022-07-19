import express from "express";
import { deleteProduct } from "./deleteProduct";
import { getProduct } from "./getProduct";
import { postProduct } from "./postProduct";
import { putProduct } from "./putProduct";

const router = express.Router();

router.get("/aggregate", getProduct);
router.post("/new", postProduct);
router.put("/update", putProduct);
router.delete("/delete", deleteProduct);

export default router;

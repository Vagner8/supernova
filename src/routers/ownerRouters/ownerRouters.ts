import express from "express";
import { getOwner } from "./controllers/getOwner";
import { updateOwner } from "./controllers/updateOwner";

const router = express.Router();

router.get("/", getOwner);
router.put("/update", updateOwner);

export default router;

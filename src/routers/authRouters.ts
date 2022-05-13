import express from "express";
import { validationMiddleware } from "./../middleware/validationMiddleware";
import { registrationPost } from "./../controllers/authControllers";

const router = express.Router();

router.post("/registration", registrationPost);

export default router;

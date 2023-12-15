import express from "express";
import { registerUser } from "../controller/user";

const router = express.Router();

router.post("/register", registerUser);

export default router;

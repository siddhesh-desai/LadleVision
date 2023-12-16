import express from "express";
import { login_post, logout, register_post } from "../controller/auth.js";
// import { renderRegister } from "../controller/user.js";

const router = express.Router();

// router.post("/register", registerUser);

router.post("/register", register_post);
router.post("/login", login_post);
router.get("/logout", logout)

// router.post("/register", registerUser);

export default router;

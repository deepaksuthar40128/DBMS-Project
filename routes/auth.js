import express from "express";
import { login,register,logout, addKey } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/addKey", addKey);


export default router
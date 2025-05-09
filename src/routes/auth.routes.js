import express from "express";
import { getUsers, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

export default router;

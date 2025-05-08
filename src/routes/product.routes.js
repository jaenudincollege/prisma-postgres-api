import express from "express";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);

export default router;

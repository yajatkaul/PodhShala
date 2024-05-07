import express from "express";
import {
  getProducts,
  sendProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/upload", sendProducts);

export default router;

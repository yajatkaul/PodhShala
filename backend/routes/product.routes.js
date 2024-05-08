import express from "express";
import {
  Orderplace,
  getProducts,
  sendProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/upload", sendProducts);
router.post("/placeorder", Orderplace);

export default router;

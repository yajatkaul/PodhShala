import express from "express";
import {
  CartAdd,
  CartItems,
  CartRemove,
  LogIn,
  Logout,
  SignUp,
  flushCart,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/logout", Logout);

router.post("/cart/add/:id", protectRoute, CartAdd);
router.post("/cart/remove/:id", protectRoute, CartRemove);

router.get("/cart/flush", protectRoute, flushCart);

router.get("/cart", protectRoute, CartItems);

export default router;

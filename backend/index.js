import express from "express";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { configDotenv } from "dotenv";
import authRoutes from "../backend/routes/auth.routes.js";
import productRoutes from "../backend/routes/product.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
configDotenv();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  connectToMongoDB();
  console.log("https://localhost:3000");
});

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    image: {
      type: String,
      default: "Placeholder",
    },
    category: {
      type: String,
      enum: ["Fertilizer", "Plant", "Tree Sapling", "Seed"],
    },
    discountPercentage: {
      type: String,
      default: "-10%",
    },
    rating: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

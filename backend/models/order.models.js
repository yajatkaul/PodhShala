import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    cost: {
      type: String,
      required: true,
    },
    items: [
      {
        type: String,
        default: [],
      },
    ],
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

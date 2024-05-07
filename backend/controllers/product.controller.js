import Product from "../models/product.models.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const sendProducts = async (req, res) => {
  try {
    const {
      name,
      price,
      discountPrice,
      image,
      category,
      discountPercentage,
      rating,
    } = req.body;

    const nameCheck = await Product.findOne({ name });

    if (nameCheck) {
      return res.status(400).json("Name used");
    }

    const newProduct = new Product({
      name,
      price,
      discountPrice,
      image,
      category,
      discountPercentage,
      rating,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

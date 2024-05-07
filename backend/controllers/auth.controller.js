import User from "../models/user.models.js";
import generateWebToken from "../utils/cookieGenerator.js";
import mongoose from "mongoose";

export const SignUp = async (req, res) => {
  try {
    const { email, userName, password, confirmPassword } = req.body;

    const user = await User.findOne({ userName });

    if (user) {
      return res.status(400).json({ err: "Username exists" });
    }

    if (user && email === user.email) {
      return res.status(400).json({ err: "Email used" });
    }

    if (!userName || !password || !email || !confirmPassword) {
      return res.status(400).json({ err: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ err: "Password's dont match" });
    }

    if (userName.length < 6) {
      return res.status(400).json({
        err: "Username should be atleast 6 characters long",
      });
    }

    const defaultPic =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Microsoft_Account_Logo.svg/1200px-Microsoft_Account_Logo.svg.png";

    const newUser = new User({
      email: email,
      userName: userName,
      password: password,
      profilePic: defaultPic,
    });

    await newUser.save();

    generateWebToken(newUser._id, res);

    res.status(200).json({
      _id: newUser._id,
      email: email,
      userName: userName,
      profilePic: defaultPic,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (!userName || !password) {
      return res.status(400).json({ err: "Please fill all fields" });
    }

    if (!user) {
      return res
        .status(400)
        .json({ err: "Username or Password was incorrect" });
    }
    if (password != user.password) {
      return res
        .status(400)
        .json({ err: "Username or Password was incorrect" });
    }

    generateWebToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "LoggedOut" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

export const CartItems = async (req, res) => {
  const userid = req.user._id;
  try {
    const user = await User.findOne({ _id: userid })
      .populate("cart")
      .select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

export const CartAdd = async (req, res) => {
  const userid = req.user._id;
  const { id: convoID } = req.params;
  try {
    const user = await User.findOne({ _id: userid })
      .populate("cart")
      .select("-password");

    user.cart.push({ _id: convoID });

    await user.save();
    const user2 = await User.findOne({ _id: userid }).populate("cart");
    res.status(200).json(user2);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const ObjectId = mongoose.Types.ObjectId;

export const CartRemove = async (req, res) => {
  const userid = req.user._id;
  const { id: cartID } = req.params;

  try {
    const user = await User.findOne({ _id: userid });

    const convoObjectId = new ObjectId(cartID);

    const index = user.cart.findIndex((item) => item.equals(convoObjectId));

    if (index !== -1) {
      console.log(user.cart);
      user.cart.splice(index, 1);
      await user.save();
    }
    const userres = await User.findOne({ _id: userid }).populate("cart");
    res.status(200).json(userres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: err.message });
  }
};

export const flushCart = async (req, res) => {
  const userid = req.user._id;
  try {
    const user = await User.findOne({ _id: userid });

    user.cart = [];
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

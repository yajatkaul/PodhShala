import jwt from "jsonwebtoken";

const generateWebToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevenet XSS attacks (cross-site scripting attacks)
    sameSite: "strict", //CSRF attacks prevention
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateWebToken;

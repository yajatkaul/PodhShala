import React, { useEffect } from "react";
import gif from "/success.gif";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import useFlushCart from "../hooks/useFlushCart";

const CheckedOut = () => {
  const navigate = useNavigate();
  const { setCart } = useCartContext();
  const { flush } = useFlushCart();
  useEffect(() => {
    setCart([]);
    localStorage.removeItem("cart");
    flush();
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <img src={gif} className="h-[450px]" />
      <p className="mt-[-100px]">Successful</p>
    </div>
  );
};

export default CheckedOut;

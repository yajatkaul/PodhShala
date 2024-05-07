import { useState } from "react";
import toast from "react-hot-toast";
import { useCartContext } from "../context/CartContext";

const useRemoveFromcart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCartContext();

  const removeCart = async ({ id }) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/cart/remove/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      if (data.err) {
        throw new Error(data.err);
      }
      setCart(data);
      console.log(data);
      localStorage.setItem("cart", JSON.stringify(data));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, removeCart };
};

export default useRemoveFromcart;

import React, { useCallback, useState } from "react";
import useRemoveFromcart from "../../hooks/useRemoveFromCart";
import useAddtocart from "../../hooks/useAddtocart";
import { useCartContext } from "../../context/CartContext";

const CartItem = ({ item, count }) => {
  const { removeCart } = useRemoveFromcart();
  const { addCart } = useAddtocart();
  const { cart } = useCartContext();

  const plus = () => {
    addCart({ id: item._id });
  };

  const minus = () => {
    if (count > 0) {
      removeCart({ id: item._id });
    }
  };

  return (
    <>
      <div className={`flex ${item.image === "Placeholder" ? "hidden" : ""}`}>
        <div className="bg-white">
          <img src={item.image} className="w-[150px] max-h-[150px]" />
        </div>

        <div className="ml-[30px] w-full">
          <p className="text-[30px] mb-[10px]">{item.name}</p>
          <p className="text-[15px]">₹{item.discountPrice}</p>
          <div className="flex gap-[30px] justify-center items-center mt-[10px] ml-[10px]">
            <button className="btn" onClick={minus}>
              -
            </button>
            <p className="text-[20px]">{count}</p>
            <button className="btn" onClick={plus}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

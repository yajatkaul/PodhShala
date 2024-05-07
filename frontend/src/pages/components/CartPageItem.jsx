import React from "react";
import useAddtocart from "../../hooks/useAddtocart";
import useRemoveFromcart from "../../hooks/useRemoveFromCart";

const CartPageItem = ({ item, count }) => {
  const { addCart } = useAddtocart();
  const { removeCart } = useRemoveFromcart();

  const plus = () => {
    addCart({ id: item._id });
  };

  const minus = () => {
    if (count > 0) {
      removeCart({ id: item._id });
    }
  };
  return (
    <div className="flex">
      <div className="bg-white">
        <img src={item.image} className="w-[150px] max-h-[200px]" />
      </div>
      <div className="ml-[40px]">
        <p className="text-[20px]">{item.name}</p>
        <p>₹{item.price}</p>
        <div className="flex items-center justify-between w-[200px] mr-[30px]">
          <button className="btn btn-outline" onClick={minus}>
            -
          </button>
          <p className="text-[15px]">{count}</p>
          <button className="btn btn-outline" onClick={plus}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPageItem;

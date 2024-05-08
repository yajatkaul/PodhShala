import React from "react";
import { useCartContext } from "../context/CartContext";
import CartPageItem from "./components/CartPageItem";
import { IoHome } from "react-icons/io5";
import CheckoutDetails from "./components/CheckoutDetails";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const { cart } = useCartContext();

  const countItemsInCart = () => {
    const counts = {};
    cart?.cart.forEach((item) => {
      counts[item._id] = (counts[item._id] || 0) + 1;
    });
    return counts;
  };

  const counts = countItemsInCart();
  const uniqueItems = cart?.cart
    ?.filter(
      (item, index, self) => index === self.findIndex((t) => t._id === item._id)
    )
    ?.map((item) => ({ ...item, count: counts[item._id] }));

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex gap-[30px] bg-slate-1000 p-[50px] rounded-2xl outline-1 outline">
          <div className="flex flex-col gap-[30px]">
            <a href="/">
              <button className="btn">
                <IoHome className="w-[20px] h-[20px]" />
              </button>
            </a>
            <div className="flex flex-col gap-[30px] overflow-auto h-[600px]">
              {cart?.cart[0] ? (
                ""
              ) : (
                <div className="flex flex-col justify-center items-center h-full mb-[70px] md:w-[300px] xl:w-[600px]">
                  <MdRemoveShoppingCart className="h-[50px] w-[50px]" />
                  <p className="text-[25px]">Cart is empty</p>
                </div>
              )}
              {uniqueItems?.map((item) => {
                return (
                  <CartPageItem key={item._id} item={item} count={item.count} />
                );
              })}
            </div>
          </div>
          <div className="divider divider-horizontal">></div>
          <div>
            <CheckoutDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

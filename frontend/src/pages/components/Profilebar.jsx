import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";
import { useCartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import { MdRemoveShoppingCart } from "react-icons/md";

const Profilebar = () => {
  const { authUser } = useAuthContext();
  const { cart } = useCartContext();

  const { loading, logout } = useLogout();

  const countItemsInCart = () => {
    const counts = {};
    cart?.cart?.forEach((item) => {
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
      {authUser ? (
        <div className="flex gap-[20px] z-50">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 mt-[10px]">
              <FaCartShopping className="h-[30px] w-[30px]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[600px]"
            >
              <div className="overflow-auto max-h-[600px] flex flex-col gap-[10px]">
                {!cart?.cart || cart?.cart.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-[100px]">
                    <MdRemoveShoppingCart className="h-[60px] w-[60px]" />
                    <p className="text-[20px]">Cart is empty</p>
                  </div>
                ) : (
                  ""
                )}
                {uniqueItems?.map((item) => (
                  <CartItem key={item._id} item={item} count={item.count} />
                ))}
              </div>
              <a href="/cart">
                <div className="flex">
                  <button className="btn btn-outline flex-1 mt-[10px]">
                    Go To Cart
                  </button>
                </div>
              </a>
            </ul>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <img src={authUser.profilePic} className="w-10 mr-[20px]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <a href="/login">
          <button className="btn md:mr-[100px] mr-[30px]">Login</button>
        </a>
      )}
    </>
  );
};

export default Profilebar;

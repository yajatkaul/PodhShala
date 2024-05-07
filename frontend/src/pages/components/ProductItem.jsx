import React, { useEffect, useState } from "react";
import useAddtocart from "../../hooks/useAddtocart";
import { useCartContext } from "../../context/CartContext";
import useRemoveFromcart from "../../hooks/useRemoveFromCart";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ProductItem = ({ product }) => {
  const { loading, addCart } = useAddtocart();
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { cart } = useCartContext();
  const { removeCart } = useRemoveFromcart();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Check if the product is in the cart
    const isInCart = cart?.cart?.some((item) => item._id === product._id);
    setInCart(isInCart);
    const cartItemCount = cart?.cart?.filter(
      (item) => item._id === product._id
    ).length;
    setQuantity(cartItemCount);
  }, [cart, product]);

  const handleAdd = () => {
    if (authUser) {
      addCart({ id: product._id });
    } else {
      toast.error("Please login or signup");
    }
  };

  const handleRemove = () => {
    removeCart({ id: product._id });
  };

  let id = "";
  if (product.name === "Alovera") {
    id = "plants";
  } else if (product.name === "Dichlorvos") {
    id = "fertilizers-pesticides";
  } else if (product.name === "Rubber Tree") {
    id = "tree-saplings";
  } else if (product.name == "Carrot Seeds") {
    id = "seeds";
  }

  return (
    <div className={`w-[400px] h-fit flex flex-col`} id={id}>
      <div className="h-[500px] bg-white flex justify-center items-center">
        <img src={product.image} alt="Product" className="max-h-[500px]" />
      </div>

      <p className="text-[30px]">{product.name}</p>
      <div className="flex">
        <p className="line-through">₹{product.price}</p>
        <p className="ml-[5px]">{product.discountPercentage}</p>
      </div>

      <p>₹{product.discountPrice}</p>
      <div>
        <div className="rating">
          <input
            type="radio"
            name={product._id}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={product._id}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={product._id}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={product._id}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={product._id}
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
      {inCart ? (
        <div className="flex justify-between">
          <button className="btn" onClick={handleRemove}>
            -
          </button>
          <p>{quantity}</p>
          <button className="btn" onClick={handleAdd}>
            +
          </button>
        </div>
      ) : (
        <button onClick={handleAdd} className="btn btn-outline">
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductItem;

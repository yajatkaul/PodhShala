import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import usePlaceOrder from "../../hooks/usePlaceOrder";
import { useAuthContext } from "../../context/AuthContext";

const CheckoutDetails = () => {
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount
  const { cart } = useCartContext();
  const navigate = useNavigate();
  const { loading, placeOrder } = usePlaceOrder();
  const { authUser } = useAuthContext();

  const [inputs, setInputs] = useState({
    name: authUser.userName,
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
    cost: 0,
    items: cart?.cart,
  });

  useEffect(() => {
    if (cart?.cart?.length > 0) {
      calculateTotalAmount();
    }
  }, [cart?.cart]);

  const calculateTotalAmount = () => {
    let total = 0;
    cart?.cart?.forEach((item) => {
      total += item.price;
    });
    setTotalAmount(total);
    setInputs((prevInputs) => ({
      ...prevInputs,
      cost: "₹" + total,
    }));
  };

  const handleCheckout = async () => {
    if (
      !inputs.addressLine1 ||
      !inputs.addressLine2 ||
      !inputs.state ||
      !inputs.city ||
      !inputs.pincode
    ) {
      return toast.error("Fill all the fields");
    }
    if (!cart.cart[0]) {
      return toast.error("Cart is empty");
    }

    await placeOrder(inputs);

    navigate("/checkout");
  };

  return (
    <div className="flex flex-col h-full justify-center gap-[20px] items-center">
      <p className="text-[20px]">Delivery Address</p>
      <input
        type="text"
        placeholder="Address line 1"
        className="input input-bordered w-full max-w-xs"
        value={inputs.addressLine1}
        onChange={(e) => setInputs({ ...inputs, addressLine1: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address line 2"
        className="input input-bordered w-full max-w-xs"
        value={inputs.addressLine2}
        onChange={(e) => setInputs({ ...inputs, addressLine2: e.target.value })}
      />
      <input
        type="text"
        placeholder="State"
        className="input input-bordered w-full max-w-xs"
        value={inputs.state}
        onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        className="input input-bordered w-full max-w-xs"
        value={inputs.city}
        onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
      />
      <input
        type="number"
        placeholder="Pin Code"
        className="input input-bordered w-full max-w-xs"
        value={inputs.pincode}
        onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
      />
      <button className="btn btn-wide" onClick={handleCheckout}>
        {loading ? (
          <span className="loading loading-ring loading-lg"></span>
        ) : (
          "PlaceOrder"
        )}
      </button>
      <div
        className={`flex flex-col justify-start w-full ${
          cart?.cart[0] ? "" : "hidden"
        }`}
      >
        <p>Total: ₹{totalAmount}</p>
        <p>Gst: 18%</p>
        <p>Final amount: ₹{totalAmount + (totalAmount * 18) / 100}</p>
      </div>
    </div>
  );
};

export default CheckoutDetails;

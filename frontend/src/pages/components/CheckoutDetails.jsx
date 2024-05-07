import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

const CheckoutDetails = () => {
  const [inputs, setInputs] = useState({
    Address1: "",
    Address2: "",
    State: "",
    City: "",
    PinCode: "",
  });
  const [totalAmount, setTotalAmount] = useState(0); // State to hold the total amount
  const { cart } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate total amount whenever cart changes
    calculateTotalAmount();
  }, [cart.cart]); // Run when cart.cart changes

  const calculateTotalAmount = () => {
    let total = 0;
    cart.cart.forEach((item) => {
      total += item.price;
    });
    setTotalAmount(total);
  };

  const handleCheckout = () => {
    if (
      !inputs.Address1 ||
      !inputs.Address2 ||
      !inputs.State ||
      !inputs.City ||
      !inputs.PinCode
    ) {
      return toast.error("Fill all the fields");
    }
    if (!cart.cart[0]) {
      return toast.error("Cart is empty");
    }

    navigate("/checkout");
  };

  return (
    <div className="flex flex-col h-full justify-center gap-[20px] items-center">
      <p className="text-[20px]">Delivery Address</p>
      <input
        type="text"
        placeholder="Address line 1"
        className="input input-bordered w-full max-w-xs"
        value={inputs.Address1}
        onChange={(e) => setInputs({ ...inputs, Address1: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address line 2"
        className="input input-bordered w-full max-w-xs"
        value={inputs.Address2}
        onChange={(e) => setInputs({ ...inputs, Address2: e.target.value })}
      />
      <input
        type="text"
        placeholder="State"
        className="input input-bordered w-full max-w-xs"
        value={inputs.State}
        onChange={(e) => setInputs({ ...inputs, State: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        className="input input-bordered w-full max-w-xs"
        value={inputs.City}
        onChange={(e) => setInputs({ ...inputs, City: e.target.value })}
      />
      <input
        type="number"
        placeholder="Pin Code"
        className="input input-bordered w-full max-w-xs"
        value={inputs.PinCode}
        onChange={(e) => setInputs({ ...inputs, PinCode: e.target.value })}
      />
      <button className="btn btn-wide" onClick={handleCheckout}>
        Place Order
      </button>
      <div
        className={`flex flex-col justify-start w-full ${
          cart.cart[0] ? "" : "hidden"
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

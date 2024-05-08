import react, { useState } from "react";
import toast from "react-hot-toast";

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);

  const placeOrder = async ({
    name,
    addressLine1,
    addressLine2,
    state,
    city,
    pincode,
    cost,
    items,
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/products/placeorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          addressLine1,
          addressLine2,
          state,
          city,
          pincode,
          cost,
          items,
        }),
      });

      const data = await res.json();

      if (data.err) {
        throw new Error(data.err);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return { loading, placeOrder };
};

export default usePlaceOrder;

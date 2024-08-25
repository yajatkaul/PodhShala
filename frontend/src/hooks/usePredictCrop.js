import { useState } from "react";
import toast from "react-hot-toast";

const usePredictCrop = () => {
  const [loading, setLoading] = useState(false);

  const predict = async ({
    nitrogen,
    phosphorous,
    pottasium,
    ph,
    raifall,
    temperature,
    humidity,
  }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/crop-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nitrogen: nitrogen,
          phosphorous: phosphorous,
          pottasium: pottasium,
          ph: ph,
          rainfall: raifall,
          temperature: temperature,
          humidity: humidity,
        }),
      });
      const data = await res.json();

      if (data.err) {
        throw new Error(data.err);
      }
      return data;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, predict };
};

export default usePredictCrop;

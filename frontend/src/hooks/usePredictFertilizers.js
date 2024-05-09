import { useState } from "react";
import toast from "react-hot-toast";

const usePredictFertilizers = () => {
  const [loading, setLoading] = useState(false);

  const predict = async ({ nitrogen, phosphorous, pottasium, crop }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8001/fertilizer-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nitrogen: nitrogen,
          phosphorous: phosphorous,
          pottasium: pottasium,
          cropname: crop,
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

export default usePredictFertilizers;

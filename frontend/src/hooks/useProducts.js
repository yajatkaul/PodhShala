import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products/");

        const data = await res.json();
        if (data.err) {
          throw new Error(data.err);
        }
        setProduct(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  return { loading, product };
};

export default useProducts;

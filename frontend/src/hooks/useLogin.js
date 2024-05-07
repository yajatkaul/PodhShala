import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const handelLogin = async ({ userName, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();
      if (data.err) {
        throw new Error(data.err);
      }

      localStorage.setItem("podh-shala", JSON.stringify(data));

      setAuthUser(data);

      const res2 = await fetch("/api/auth/cart");
      const data2 = await res2.json();

      localStorage.setItem("cart", JSON.stringify(data2));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handelLogin };
};

export default useLogin;

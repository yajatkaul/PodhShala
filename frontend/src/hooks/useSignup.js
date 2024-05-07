import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const handelSignup = async ({
    email,
    userName,
    password,
    confirmPassword,
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          userName,
          password,
          confirmPassword,
        }),
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
  return { loading, handelSignup };
};

export default useSignup;

const useFlushCart = () => {
  const flush = async () => {
    const res = await fetch("/api/auth/cart/flush");
  };
  return { flush };
};

export default useFlushCart;

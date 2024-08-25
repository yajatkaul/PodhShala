import React, { useEffect, useState } from "react";

const FixedNav = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`z-10 flex h-[50px] fixed top-0 ${
        scrollOffset >= 300 ? "" : "hidden"
      } gap-[20px] w-full bg-slate-800`}
    >
      <a href="/">
        <button className="btn btn-outline">Home</button>
      </a>
      <a href="/crop-predict">
        <button className="btn btn-outline">Crop Predection</button>
      </a>
    </div>
  );
};

export default FixedNav;

import React, { useEffect, useState } from "react";
import { IoMdArrowDropupCircle } from "react-icons/io";

const Scrollup = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    <>
      <button
        onClick={scrollToTop}
        className={`btn btn-outline fixed bottom-[30px] right-[30px] ${
          scrollOffset >= 300 ? "" : "hidden"
        }`}
      >
        <IoMdArrowDropupCircle className="w-[30px] h-[30px]" />
      </button>
    </>
  );
};

export default Scrollup;

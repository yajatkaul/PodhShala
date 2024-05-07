import React from "react";
import image from "/icon.png";
import Profilebar from "./Profilebar";

const Header = () => {
  return (
    <div className="flex w-screen flex-col">
      <div className="flex bg-[rgb(5,99,46)] h-[100px] justify-start items-center">
        <img src={image} className="h-[35px] w-[35px] ml-[50px]" />
        <p className="text-white font-bold text-[30px]">PODH</p>
        <p className="text-[rgb(255,255,0)] font-bold text-[30px]">SHALA</p>
        <div className="flex-1 flex justify-end">
          <Profilebar />
        </div>
      </div>
    </div>
  );
};

export default Header;

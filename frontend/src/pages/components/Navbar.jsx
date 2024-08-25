import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-[50px] gap-[20px] bg-slate-800 pl-2">
      <a href="/">
        <button className="btn">Home</button>
      </a>
      <a href="/crop-predict">
        <button className="btn">Crop Predection</button>
      </a>
    </div>
  );
};

export default Navbar;

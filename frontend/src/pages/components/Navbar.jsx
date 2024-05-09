import React from "react";

const Navbar = () => {
  return (
    <div className="flex h-[50px] gap-[20px] bg-slate-700">
      <a href="/">
        <button className="btn btn-outline">Home</button>
      </a>
      <a href="/crop-predict">
        <button className="btn btn-outline">Crop Predection</button>
      </a>
      <a href="/fertilizer-predict">
        <button className="btn btn-outline">Fertilizer Predection</button>
      </a>
    </div>
  );
};

export default Navbar;

import React from "react";
import sapling from "../../assets/icons/saplings.png";

const Category = () => {
  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <p className="flex text-[40px] justify-center items-center">Categories</p>
      <div className="flex justify-center items-center md:gap-[50px] gap-[10px] mt-[30px] mb-[30px]">
        <button onClick={() => smoothScrollTo("fertilizers-pesticides")}>
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-slate-700 rounded-3xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3072/3072498.png"
              className="w-[150px]"
            />
            <div className="flex justify-center flex-col items-center">
              <p className="text-[15px]">Fertilizers and</p>
              <p>Pesticides</p>
            </div>
          </div>
        </button>
        <button onClick={() => smoothScrollTo("plants")}>
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-slate-700 rounded-3xl">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4147/4147953.png"
              className="w-[150px]"
            />
            <div className="flex justify-center flex-col items-center h-[50px]">
              <p>Plants</p>
            </div>
          </div>
        </button>
        <button onClick={() => smoothScrollTo("tree-saplings")}>
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-slate-700 rounded-3xl">
            <img src={sapling} className="w-[150px]" />
            <div className="flex justify-center flex-col items-center">
              <p>Tree</p>
              <p>Saplings</p>
            </div>
          </div>
        </button>
        <button onClick={() => smoothScrollTo("seeds")}>
          <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-slate-700 rounded-3xl">
            <img
              src="https://cdn-icons-png.freepik.com/256/2227/2227504.png?semt=ais_hybrid"
              className="w-[150px]"
            />
            <div className="flex justify-center flex-col items-center h-[50px]">
              <p>Seeds</p>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Category;

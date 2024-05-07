import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductItem from "./ProductItem";

const Products = () => {
  const { loading, product } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = product.filter((product) =>
    product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <p className="flex justify-start ml-[10px] text-[40px] md:ml-[55px] xl:ml-[110px]">
        Products
      </p>
      <div className="flex w-full justify-center items-center mt-[30px] pr-[110px] pl-[110px] mb-[50px]">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-[30px] flex-wrap justify-center">
        {filteredProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
        {filteredProducts.length === 0 ? <p>No results found</p> : ""}
      </div>
    </>
  );
};

export default Products;

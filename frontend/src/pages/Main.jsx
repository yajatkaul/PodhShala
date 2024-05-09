import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Category from "./components/Category";
import Scrollup from "./components/Scrollup";
import FixedNav from "./components/FixedNav";

const Main = () => {
  return (
    <>
      <Header />
      <FixedNav />
      <Home />
      <Category />
      <Products />
      <Footer />
      <Scrollup />
    </>
  );
};

export default Main;

import React from "react";
import { Carousel } from "flowbite-react";
import image from "../../assets/slider/slider1.jpg";
import image2 from "../../assets/slider/slider2.jpg";
import image3 from "../../assets/slider/slider3.jpg";

const Home = () => {
  return (
    <>
      <div className="h-[100px] sm:h-[500px] xl:h-[500px] pr-[50px] pl-[50px] mt-[50px]">
        <Carousel>
          <img src={image} className="rounded-xl" alt="..." />
          <img src={image2} className="rounded-xl" alt="..." />
          <img src={image3} className="rounded-xl" alt="..." />
        </Carousel>
      </div>
    </>
  );
};
export default Home;

import React from "react";
import Slider from "react-slick";
import slide1 from '../../assets/images/1.png'
import slide2 from '../../assets/images/22.png'
import slide3 from '../../assets/images/3.png'


export default function Mainslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings} className=' mb-4 ' >
       <img src={slide1}alt="product1" className="w-100" height={350}/>
       <img src={slide2}alt="product2" className="w-100" height={350}/>
       <img src={slide3}alt="product3" className="w-100" height={350}/>

      </Slider>
    </div>
  );
}
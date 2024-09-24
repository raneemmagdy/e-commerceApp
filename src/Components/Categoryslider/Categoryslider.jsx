import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function Categoryslider() {
    let [categories,setCategories]=useState([])
    async function getAllCategories() {
      let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      //console.log(data.data)
      setCategories(data.data)
    }
    useEffect(()=>{
      getAllCategories()
    },[])
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow:5,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:1500
    };
    return (
      <div  className="overflow-hidden">


      
        <Slider {...settings}  className=' mb-5 '>
        {categories.map(category=><div key={category._id} >
          <img src={category.image}alt="product" height={200}   style={{ width: '100%' }}/>
          <h4 className='text-center'>{category.name}</h4>
        </div>)}
  
        </Slider>
      </div>
    );
}

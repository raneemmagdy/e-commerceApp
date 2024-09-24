import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
 let {counter,setCounter,addToCart}=useContext(cartContext)
 let [loadingBtn, setLoadingBtn] = useState(false);
  
  let id = useParams();
  console.log(id);
  let [product, setProduct] = useState([]);
  let [loading,setLoading]=useState(true)
 

  async function getSpecificProduct() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id.id}`
      );
      console.log(data.data);
      setProduct(data.data);
      setLoading(false)
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false)
    }
  }
  async function addProductToCart(productId) {
    setLoadingBtn(true);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status === "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setLoadingBtn(false);
    } else {
      toast.error(data.message);
    }
  }

  useEffect(() => {
    getSpecificProduct();
  }, []);
  if(loading)return<Loading/>
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container  m-auto my-5">
        <div className="row">
        <div className="col-md-4">
        <Slider {...settings}>
          {product?.images?.map(image=><img key={image}src={image}className=" w-100" height={300}  alt="product"/>)} 
        </Slider>
      </div>
      <div className="col-md-8 my-5">
      <h3 className="text-main">{product.title}</h3>
        <p className="text-muted">{product.description}</p>
        <h5 className="text-main">{product.category.name}</h5>
        <div className="footer d-flex justify-content-between align-items-center ">
          <div className="rate  fs-4  ">
            <span>{product.ratingsAverage}</span>
            <i className="fa-solid fa-star fa-1x rating-color m-1 cursor-pointer"></i>
          </div>
          <div className="Price">
            <h5>{product.price} EGP</h5>
          </div>
        </div>
        <button
              className="btn  bg-main text-white "
              onClick={() => addProductToCart(product._id)}
              disabled={loadingBtn}
            >
              {!loadingBtn ? "Add To Cart" : "Loading..."}
            </button>      </div>
        </div>
      </div>
    </>
  );
}

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";

export default function Allorders() {
  let [orders, setOrders] = useState([]);
  async function AllOrdersForUser() {
    let token = localStorage.getItem("token");
    let id = jwtDecode(token).id;
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    console.log(data);
    setOrders(data);
  }
  useEffect(() => {
    AllOrdersForUser();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Orders Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <h1 className="text-main fw-bolder  my-5">All Orders</h1>
        <div className="row g-4">
          {orders?.map((order) => (
            <div className="col-md-4" key={order._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-main fw-bolder">
                    payment Method Type ({order.paymentMethodType})
                  </h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    total Order Price: {order.totalOrderPrice}
                  </h6>

                  <Slider {...settings} className=" m-5 ">
                    {order?.cartItems?.map((item) => (
                      <div key={item.product._id}>
                        <img
                          src={item.product.imageCover}
                          alt="product"
                          height={300}
                          className="w-100"
                        />
                        <p className="text-center ">
                          Title: {item.product.title}
                        </p>
                        <p className="text-center text-main fw-bolder">
                          Price:{item.price}
                        </p>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

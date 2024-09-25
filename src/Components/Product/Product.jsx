


import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../Context/WishlistContext";
import { Helmet } from "react-helmet";

export default function Product({ products }) {
  let {counter:wishListCounter,setCounter:setwishlistCounter,AddItemToWishlist} = useContext(wishlistContext);
  let { setCounter, addToCart } = useContext(cartContext);
  let [loadingBtn, setLoadingBtn] = useState(false);
  let [flag, setFlag] = useState(false);

  // Retrieve flag state from localStorage when the component mounts
  useEffect(() => {
    const storedFlag = localStorage.getItem(`wishlist-flag-${products._id}`);
    if (storedFlag === 'true') {
      setFlag(true);
    }
  }, [products._id]);

  // Function to handle adding the product to the wishlist
  async function addToWishlist(productId) {
    let data = await AddItemToWishlist(productId);
    console.log(data);
    if (data.status === 'success') {
      toast.success(data.message);
      setwishlistCounter(data.data.length);
      setFlag(true);
      localStorage.setItem(`wishlist-flag-${productId}`, 'true'); // Save to localStorage
    } else {
      setFlag(false);
      localStorage.removeItem(`wishlist-flag-${productId}`); // Remove from localStorage
    }
  }

  // Function to handle adding the product to the cart
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

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Product Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="col-md-3">
        <div className="card product cursor-pointer">
          <Link to={"/productDetails/" + products._id}>
            <img
              src={products.imageCover}
              className="card-img-top w-100"
              alt="product"
            />
            <div className="card-body">
              <h5 className="card-title text-main">
                {products.title.split(" ").slice(0, 3).join(" ")}
              </h5>
              <p className="card-text">{products.category.name}</p>
              <div className="footer d-flex justify-content-between align-items-center ">
                <div className="rate  fs-4  ">
                  <span>{products.ratingsAverage}</span>
                  <i className="fa-solid fa-star fa-1x rating-color m-1 cursor-pointer"></i>
                </div>
                <div className="Price">
                  <h5>{products.price} EGP</h5>
                </div>
              </div>
            </div>
          </Link>
          <div className="footer2 d-flex justify-content-between p-2">
            <button
              className="btn  bg-main text-white "
              onClick={() => addProductToCart(products._id)}
              disabled={loadingBtn}
            >
              {!loadingBtn ? "Add To Cart" : "Loading..."}
            </button>
            <button className="btn heart">
              <i
                className={`fa-solid fa-heart fa-2x cursor-pointer ${flag ? 'text-danger' : ''}`}
                onClick={() => addToWishlist(products._id)}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

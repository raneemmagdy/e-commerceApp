import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { cartContext } from "../Context/CartContext";
import { wishlistContext } from "../Context/WishlistContext";
import { toast } from "react-toastify";
export default function Navbar() {
  let { counter, getCart, setCounter } = useContext(cartContext);
  let{counter:wishlistCounter,setCounter:setwishlistCounter,getAllItemsFromWishlist}=useContext(wishlistContext)
 
function logOut(){
  localStorage.removeItem('token')
  toast.success('SignOut Successfully')
}
  useEffect(()=>{
   
(async()=>{
  let dataWishlist=await getAllItemsFromWishlist()
    console.log(dataWishlist)
    if(dataWishlist.status==='success'){
      setwishlistCounter(dataWishlist.count)
    }
  }
)()
  },[])
  useEffect(() => {
    (async () => {
      let data = await getCart();
     // console.log(data);
      if (data.status === "success") {
        setCounter(data.numOfCartItems);
      }
    })();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="#">
            <img src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/home">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/cart">
                  Cart
                  <i className="fa-solid fa-cart-shopping mx-2 nav-icon"></i>
                  {counter ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    ""
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/wishlist">
                  Wishlist
                  <i className="fa-solid fa-heart mx-2 nav-icon text-danger"></i>
                  {wishlistCounter?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistCounter}<span className="visually-hidden">unread messages</span>
                  </span>:''}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin" onClick={logOut}>
                  SignOut
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

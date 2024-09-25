import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import cart from '../../assets/images/preview.png'
import { Helmet } from "react-helmet";

export default function Cart() {
  let {clearCart, getCart, setCounter,deleteCartItem ,updateCartItemsQuantity} = useContext(cartContext);
  let [cartItems, setCartItems] = useState([]);
  let [loading, setLoading] = useState(false);
  async function getAllCartItems() {
    setLoading(true);
    let data = await getCart();
    console.log(data);
    if (data.status === "success") {
      setCounter(data.numOfCartItems);
      setCartItems(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    (() => {
      getAllCartItems()
    })();
  }, []);



  async function deleteItem(itemItem){
    
    let data=await deleteCartItem(itemItem)
    console.log(data)
    if(data.status==='success'){
        toast.success('Product Deleted Successfully')
        setCartItems(data)
        setCounter(data.numOfCartItems)
       
    }
  }
  async function updateItemsQuantity(productId,count){
    
    let{data}=await updateCartItemsQuantity(productId,count)
    console.log(data)
    if(data.status==='success'){
      toast.success('Product Updated Successfully')
      setCartItems(data)
      setCounter(data.numOfCartItems)
      
  }
  }
  async function clearAllItemsFromCart() {
    let data=await clearCart()
   console.log(data);
   if(data.message==='success'){
    toast.success(data.message)
    await getAllCartItems()
    
}
   
  }
  if (loading) return <Loading />;
  if(!cartItems.numOfCartItems)return<><div className=" m-auto d-flex flex-column justify-content-center align-items-center">
       <h1 className="text-main"> Cart is Empty</h1>
  <img src={cart} alt="cart" />
    
    </div></>
  return (
    <>

<Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container bg-main-light p-3 my-5 ">
        <h2>Shop Cart </h2>
        <p className="text-main fw-bolder">
          Total Cart Price : {cartItems?.data?.totalCartPrice} EGP
        </p>
        <button className="btn p-0"  onClick={()=>clearAllItemsFromCart()}>
                  <i className="fa-solid fa-trash-can text-danger cursor-pointer"></i>
                  <span className="text-danger "> Clear Cart</span>
        </button>
        {cartItems?.data?.products?.map((product) => (
          <div key={product._id} className="row border-bottom my-3">
            <div className="col-md-2">
              <img
                src={product.product.imageCover}
                alt="product"
                className="w-100"
              />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center ">
              <div className="details">
                <h3>{product.product.title}</h3>
                <p className="text-main fw-bolder">
                  Price :{product.price} EGP
                </p>
                <button className="btn p-0" onClick={()=>deleteItem(product.product._id)}>
                  <i className="fa-solid fa-trash-can text-danger cursor-pointer"></i>
                  <span className="text-danger "> Remove</span>
                </button>
              </div>
              <div className="counter d-flex align-items-center justify-content-center">
                <button className="btn btn-border d-flex align-items-center justify-content-center" onClick={()=>updateItemsQuantity(product.product._id,product.count+1)}>
                  <i className="fa-solid fa-plus fs-6"></i>
                </button>
                <span className="m-3">{product.count}</span>
                <button className="btn btn-border d-flex align-items-center justify-content-center" onClick={()=>updateItemsQuantity(product.product._id,product.count-1)}>
                  <i className="fa-solid fa-minus fs-6"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        <Link to={`/address/${cartItems.cartId}`} className="btn bg-main text-white my-2">Make Order</Link>
      </div>








      
    </>
  );
}

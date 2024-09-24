import axios from "axios";
import React, { createContext, useState } from "react";
export let cartContext = createContext(0);

async function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function updateCartItemsQuantity(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err);
}

async function deleteCartItem(itemId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function clearCart() {
  return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: localStorage.getItem("token") },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
async function checkOut(cartId,shippingAddress) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress},{headers:{
    token:localStorage.getItem('token')
  }}).then(({data})=>data).catch(err=>err)
}
export default function CartContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <cartContext.Provider
      value={{
        counter,
        setCounter,
        addToCart,
        getCart,
        deleteCartItem,
        updateCartItemsQuantity,
        clearCart,
        checkOut
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

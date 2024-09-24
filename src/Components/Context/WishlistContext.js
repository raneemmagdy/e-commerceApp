import axios from "axios";
import React, { createContext, useState } from "react";
export let wishlistContext = createContext(0);

async function getAllItemsFromWishlist() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("token") },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}

async function AddItemToWishlist(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
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
async function removeItemFromWishlist(productId) {
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:{
    token:localStorage.getItem('token')
   }}).then(({data})=>data).catch(err=>err)
}
export default function WishlistContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <wishlistContext.Provider
      value={{ counter, setCounter, AddItemToWishlist,getAllItemsFromWishlist,removeItemFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

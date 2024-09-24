import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../Context/WishlistContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

export default function Wishlist() {
  let { setCounter, getAllItemsFromWishlist, removeItemFromWishlist } =
    useContext(wishlistContext);

  let [wishlistData, setWishlistData] = useState([]);
  let [loading, setLoading] = useState(false);
  async function getAllDataFromWishlist() {
    setLoading(true);
    let data = await getAllItemsFromWishlist();
    console.log(data);
    if (data.status === "success") {
      setWishlistData(data);

      setLoading(false);
    }
  }
  useEffect(() => {
    (() => {
      getAllDataFromWishlist();
    })();
  }, []);
  async function removeFromWishlist(productId) {
    let dataWishlist = await removeItemFromWishlist(productId);
    console.log(dataWishlist);
    if (dataWishlist.status === "success") {
      setCounter(dataWishlist?.data?.length);

      toast.success(dataWishlist.message);
      await getAllDataFromWishlist();

      localStorage.removeItem(`wishlist-flag-${productId}`);
    }
  }
  if (loading) return <Loading />;
  return (
    <>
      <div className="container bg-main-light my-5 ">
        <h1 className=" my-5 text-center p-2">Wishlist</h1>
        {wishlistData?.data?.map((wishlistItem) => (
          <div className="row border-bottom my-4" key={wishlistItem._id}>
            <div className="col-md-2">
              <img
                src={wishlistItem.imageCover}
                className="w-100"
                alt="product"
              />
            </div>
            <div className="col-md-10 ">
              <h3>{wishlistItem.title}</h3>

              <p className="text-main fw-bolder">
                {" "}
                Quantity :{wishlistItem.quantity}
              </p>
              <p className="text-main fw-bolder">Price :{wishlistItem.price}</p>
              <button
                className="btn p-0 text-danger"
                onClick={() => {
                  removeFromWishlist(wishlistItem._id);
                }}
              >
                <i className="fa-solid fa-trash-can fs-5"></i> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

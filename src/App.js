import React from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Notfound from "./Components/Notfound/Notfound";
import Wishlist from "./Components/Wishlist/Wishlist";
import Authlayout from "./Components/Layout/Authlayout";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import CartContextProvider from "./Components/Context/CartContext";
import { ToastContainer } from 'react-toastify';
import WishlistContextProvider from "./Components/Context/WishlistContext";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import Allorders from "./Components/Allorders/Allorders";
import Address from "./Components/Address/Address";
export default function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        
        { index: true, element:<ProtectedRoute><Home/></ProtectedRoute> },
        { path: "home", element: <ProtectedRoute><Home/></ProtectedRoute> },

        { path: "products", element:  <ProtectedRoute><Products /></ProtectedRoute> },

        { path: "categories", element:<ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute>},
        { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
        { path: "categoryDetails/:id", element: <ProtectedRoute><CategoryDetails /></ProtectedRoute>},
        { path: "brandDetails/:id", element: <ProtectedRoute><BrandDetails /></ProtectedRoute>},
        { path: "forgetPassword", element: <ForgetPassword />},
        { path: "resetPassword", element: <ResetPassword />},
        { path: "verifyResetCode", element: <VerifyResetCode />},
        { path: "allorders", element:  <ProtectedRoute><Allorders /></ProtectedRoute>},
        { path: "address/:id", element:  <ProtectedRoute><Address/></ProtectedRoute>},





        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/",
      element: <Authlayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
      ],
    },
  ]);
  return (
    <>
     
       <CartContextProvider>
       <WishlistContextProvider>
        <RouterProvider router={routes} />
        </WishlistContextProvider>
      
       </CartContextProvider>
      
      
      <ToastContainer theme="dark"  autoClose={1000}/>
     
    </>
  );
}

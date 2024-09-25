import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Category from "../Category/Category";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data, isLoading } = useQuery("getAllCategories", getAllCategories);
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <div className="row g-4">
          {data?.data.data.map((category) => (
            <Category key={category._id} categories={category} />
          ))}
        </div>
      </div>
    </>
  );
}

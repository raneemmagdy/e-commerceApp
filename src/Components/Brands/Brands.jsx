import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Brand from "../Brand/Brand";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data, isLoading } = useQuery("getAllBrands", getAllBrands);
  console.log(data?.data.data);
  if (isLoading) <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <div className="row g-4">
          {data?.data.data.map((brand) => (
            <Brand brands={brand} key={brand._id} />
          ))}
        </div>
      </div>
    </>
  );
}

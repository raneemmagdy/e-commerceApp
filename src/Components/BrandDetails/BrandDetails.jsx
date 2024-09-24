import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BrandDetails() {
  let id = useParams();
  let [brand, setBrand] = useState([]);
  let [loading, setLoading] = useState(true);
  async function getSpecificBrand() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id.id}`
      );
      console.log(data.data);
      setBrand(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    getSpecificBrand();
  }, []);
  return (
    <>
      <div className="cursor-pointer brandDetails-card m-auto my-5 p-4 shadow-lg rounded">
        <div className="brand-image-container text-center">
          <img
            src={brand.image}
            alt={brand.name}
            className="brand-image img-fluid rounded-circle"
          />
        </div>
        <h2 className="brand-title text-center mt-4">{brand.name}</h2>
      </div>
    </>
  );
}

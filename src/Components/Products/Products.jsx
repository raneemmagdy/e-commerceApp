import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'

export default function Products() {
  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data,isLoading}=useQuery('getAllProducts',getAllProducts)
  //console.log(data?.data.data);
  
  if(isLoading)<Loading/>
  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          {data?.data.data.map((product) => (
            <Product products={product} key={product._id}/>
          ))}
        </div>
      </div>
    </>
  )
}

import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import { Helmet } from 'react-helmet'

export default function Products() {
  let [search,setSearch]=useState([])
  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data,isLoading}=useQuery('getAllProducts',getAllProducts)
  //console.log(data?.data.data);
  function searchForProduct(e){
    let term=e.target.value;
    let arrSearch=data?.data?.data?.filter((product)=>product?.title.toLowerCase().trim().includes(term.toLowerCase().trim()))
    setSearch(arrSearch)
  }
  if(isLoading)<Loading/>
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Products Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <input type="search" className='form-control my-5' placeholder='Search...' onChange={searchForProduct}/>
        <div className="row g-4">
          {search.length>0 ?search.map((product) => (
            <Product products={product} key={product._id}/>
          )) :data?.data.data.map((product) => (
            <Product products={product} key={product._id}/>
          ))}
        </div>
      </div>
    </>
  )
}

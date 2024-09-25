import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function CategoryDetails() {
   let id=useParams()
   console.log(id)
   let [category,setCategory]=useState([])
   let[loading,setLoading]=useState(false)
    async function getSpecificCategory() {
       
        try {
            let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id.id}`)
            console.log(data.data)
            setCategory(data.data)
            setLoading(false)

        } catch (error) {
            console.log(error.response.data.message)
            setLoading(true)
        }
    }

    useEffect(()=>{
getSpecificCategory()
    },[])
    if(loading)return<Loading/>
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Category Details Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="category-card m-auto my-5">
  <div className="category-image-container">
    <img src={category.image} alt="{category.name}" className="category-image" />
  </div>
  <h2 className="category-title">{category.name}</h2>
</div>

    
    </>
  )
}

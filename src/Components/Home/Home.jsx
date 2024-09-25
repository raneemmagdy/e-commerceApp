import React from 'react'
import Mainslider from '../Mainslider/Mainslider'
import Categoryslider from '../Categoryslider/Categoryslider'
import Products from '../Products/Products'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <Mainslider/>
    <Categoryslider/>
   
    <Products/>
    
    </>
  )
}

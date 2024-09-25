import React from 'react'
import err from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>NotFound Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className='d-flex justify-content-center align-items-center m-5'>
     <img src={err} alt="404error"  />
    </div>
    </>
}

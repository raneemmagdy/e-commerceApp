import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Category({categories}) {
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Category Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
     <div className="col-md-4">
    <Link to={'/categoryDetails/'+categories._id}>
   
    <div className="card cursor-pointer brand-card" >
        <img src={categories.image} className="card-img-top" height={400}alt="brand" />
        <div className="card-body text-center">
          <p className="card-text brand">{categories.name}</p>
        </div>
      </div>
 
    
    
    
    </Link>
    </div>
    </>
  )
}

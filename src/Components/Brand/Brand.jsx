import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Brand({ brands }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="col-md-4">
        <Link to={"/brandDetails/" + brands._id}>
          <div className="card cursor-pointer brand-card">
            <img src={brands.image} className="card-img-top" alt="brand" />
            <div className="card-body text-center">
              <p className="card-text brand">{brands.name}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

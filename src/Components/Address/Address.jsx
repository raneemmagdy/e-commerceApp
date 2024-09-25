import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { Watch } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Address() {
  let { checkOut } = useContext(cartContext);
  let [errMsg, setErrMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let { id } = useParams();
  async function AddressDetails(values) {
    setLoading(false);
    try {
      let data = await checkOut(id, values);
      console.log(data);

      if (data?.status === "success") {
        window.location.href = data.session.url;

        toast.success("Address Sent Successfully");
      }
    } catch (error) {
      toast.error("fail to send address");
      setErrMsg("fail to send address");
      setLoading(true);
    }
  }

  let Address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      AddressDetails(values);
    },
  });
  if (loading) <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Address Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        <h2 className="text-main fw-bolder">Address Details </h2>
        {errMsg ? (
          <div className="alert alert-danger my-2" role="alert">
            {errMsg}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={Address.handleSubmit}>
          <textarea
            placeholder="Details"
            className="form-control my-2"
            value={Address.values.details}
            onChange={Address.handleChange}
            onBlur={Address.handleBlur}
            name="details"
          ></textarea>
          <input
            type="text"
            placeholder="Phone"
            className="form-control my-2"
            value={Address.values.phone}
            onChange={Address.handleChange}
            onBlur={Address.handleBlur}
            name="phone"
          />
          <input
            type="text"
            placeholder="City"
            className="form-control my-2"
            value={Address.values.city}
            onChange={Address.handleChange}
            onBlur={Address.handleBlur}
            name="city"
          />

          <button
            disabled={!(Address.dirty && Address.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? (
              " Submit"
            ) : (
              <Watch
                visible={true}
                height="20"
                width="30"
                radius="48"
                color="#fff"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </button>
        </form>
      </div>
    </>
  );
}

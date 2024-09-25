import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  let navigate = useNavigate();
  let [errMsg, setErrMsg] = useState(false);
  let [loading, setLoading] = useState(false);
  async function forgetPasswordFunction(email) {
    try {
     setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        email 
      );
      console.log(data);
      if (data.statusMsg === "success") {
        navigate("/verifyResetCode");
        setLoading(false);
        toast.success(data.message)
      }
    } catch (error) {
        toast.error('Fail')
        setErrMsg('fail')
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  let forgetPassword = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (email) => {
      forgetPasswordFunction(email);
    },
    validationSchema,
  });
  if(loading)return<Loading/>
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>ForgetPassword Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container my-5">
        {}
        <form onSubmit={forgetPassword.handleSubmit}>
          <h2 className="text-main fw-bolder">Enter Your Email </h2>
          {errMsg? <div className="alert alert-danger my-2" role="alert">
              {errMsg}
            </div>:''}
          <input
            onChange={forgetPassword.handleChange}
            onBlur={forgetPassword.handleBlur}
            value={forgetPassword.values.email}
            type="email"
            placeholder="userEmail"
            name="email"
            className="form-control "
          />
          {forgetPassword.errors.email && forgetPassword.touched.email ? (
            <div className="alert alert-danger my-2" role="alert">
              {forgetPassword.errors.email}
            </div>
          ) : (
            ""
          )}
          <button
            disabled={!(forgetPassword.dirty && forgetPassword.isValid)}
            className="btn my-3 bg-main text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

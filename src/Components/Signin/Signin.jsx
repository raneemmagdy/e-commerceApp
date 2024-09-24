import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Watch } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function Signin() {
  let [errMsg,setErrMsg]=useState('')
  let[loading,setLoading]=useState(true)
  let navigate=useNavigate()
  async function sendDataToApi(values) {
    setLoading(false)
    try {
      let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      console.log(data)
      if(data.message==='success'){
        localStorage.setItem('token',data.token)
        toast.success('SignIn Successfully')
        navigate('/home')

      }
    } catch (error) {
      console.log(error)
      setLoading(true)
      setErrMsg(error.response.data.message)
      toast.error('SignIn Fail')
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][A-Za-z0-9_]{6,}$/,
        "Password must start with an uppercase letter and be at least 7 characters long"
      )
      .required("Password is required"),
  });

  let logIn = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      sendDataToApi(values)
    },
    validationSchema,
  });
  return (
    <div className="m-auto w-75 my-5">
      <h2>Log In</h2>
      {errMsg!==''?<div className="alert alert-danger my-2" role="alert">
  {errMsg}
</div>:''}
      <form onSubmit={logIn.handleSubmit}>
        <input
          onChange={logIn.handleChange}
          onBlur={logIn.handleBlur}
          value={logIn.values.email}
          type="email"
          name="email"
          placeholder="userEmail"
          className="form-control my-3"
        />
        {logIn.errors.email && logIn.touched.email ? (
          <div className="alert alert-danger" role="alert">
            {logIn.errors.email}
          </div>
        ) : (
          ""
        )}
        <input
          onChange={logIn.handleChange}
          onBlur={logIn.handleBlur}
          value={logIn.values.password}
          type="password"
          name="password"
          placeholder="userPassword"
          className="form-control my-3"
        />
        {logIn.errors.password && logIn.touched.password ? (
          <div className="alert alert-danger" role="alert">
            {logIn.errors.password}
          </div>
        ) 
        
        
       
        : (
          ""
        )}

        <Link to='/forgetPassword' className="text-main fw-bolder d-block my-3">Forget Password?</Link>
        {logIn.dirty && logIn.isValid ? (
          <button type="submit" className="my-5 btn bg-main text-white">
           {loading?' SignIn':  <Watch
                visible={true}
                height="20"
                width="30"
                radius="48"
                color="#fff"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />}
          </button>
        ) : (
          <button disabled type="submit" className="btn bg-main text-white">
             {loading?' SignIn':  <Watch
                visible={true}
                height="20"
                width="30"
                radius="48"
                color="#fff"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />}
          </button>
        )}
      </form>
    </div>
  );
}

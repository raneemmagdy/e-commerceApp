import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import {  Watch } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
export default function Signup() {
  let [loading, setLoading] = useState(true);
  let [errMsg, setErrMsg] = useState("");
  let navigate=useNavigate()

  async function sendDataToApi(values) {
    setLoading(false);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(data);
      if(data.message==='success'){
        navigate('/signin')
      }
    } catch (err) {
      console.log(err.response.data.message);
      setErrMsg(err.response.data.message);
      setLoading(true);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][A-Za-z0-9_]{6,}$/,
        "Password must start with an uppercase letter and be at least 7 characters long"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(/^(012|011|010|015)[0-9]{8}$/, "Phone number is not valid")
      .required("Phone is required"),
  });
  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      sendDataToApi(values);
    },
    validationSchema,
  });

  console.log(register.errors);
  return (
   <>
   <Helmet>
        <meta charSet="utf-8" />
        <title>SignUp Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="my-5 w-75 m-auto">
      <h2>Register</h2>
      {errMsg !== "" ? (
        <div className="alert alert-danger my-2" role="alert">
          {errMsg}
        </div>
      ) : (
        ""
      )}
      <form onSubmit={register.handleSubmit}>
        <input
          onBlur={register.handleBlur}
          value={register.values.name}
          onChange={register.handleChange}
          type="text"
          className="form-control my-3"
          placeholder="userName"
          name="name"
        />
        {register.errors.name && register.touched.name ? (
          <div className="alert alert-danger" role="alert">
            {register.errors.name}
          </div>
        ) : (
          ""
        )}
        <input
          onBlur={register.handleBlur}
          value={register.values.email}
          onChange={register.handleChange}
          type="email"
          className="form-control my-3"
          placeholder="userEmail"
          name="email"
        />
        {register.errors.email && register.touched.email ? (
          <div className="alert alert-danger" role="alert">
            {register.errors.email}
          </div>
        ) : (
          ""
        )}
        <input
          onBlur={register.handleBlur}
          value={register.values.password}
          onChange={register.handleChange}
          type="password"
          className="form-control my-3"
          placeholder="userPassword"
          name="password"
        />
        {register.errors.password && register.touched.password ? (
          <div className="alert alert-danger" role="alert">
            {register.errors.password}
          </div>
        ) : (
          ""
        )}
        <input
          onBlur={register.handleBlur}
          value={register.values.rePassword}
          onChange={register.handleChange}
          type="password"
          className="form-control my-3"
          placeholder="userRepassword"
          name="rePassword"
        />
        {register.errors.rePassword && register.touched.rePassword ? (
          <div className="alert alert-danger" role="alert">
            {register.errors.rePassword}
          </div>
        ) : (
          ""
        )}
        <input
          onBlur={register.handleBlur}
          value={register.values.phone}
          onChange={register.handleChange}
          type="text"
          className="form-control my-3"
          placeholder="userPhone"
          name="phone"
        />

        {register.errors.phone && register.touched.phone ? (
          <div className="alert alert-danger" role="alert">
            {register.errors.phone}
          </div>
        ) : (
          ""
        )}
        {register.dirty && register.isValid ? (
          <button type="submit" className="btn bg-main text-white">
            {loading ? (
              "SignUp"
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
        ) : (
          <button disabled type="submit" className="btn bg-main text-white">
            {loading ? (
              "SignUp"
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
        )}
      </form>
    </div>
   
   
   
   </>
  );
}

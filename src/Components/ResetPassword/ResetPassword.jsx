import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function ResetPassword() {
    let[errMsg,setErrMsg]=useState('')
    let [loading,setLoading]=useState(false)
    let navigate=useNavigate()
  async function resetPasswordFuction(values) {
    try {
        setLoading(true)
        let {data}=await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
        console.log(data)
       
          if(data.token){
            navigate("/signin");
            setLoading(false);
            localStorage.setItem('token',data.token)
            toast.success('Password Reset Successfully')
        
          }
    } catch (error) {
        toast.error('fail reset Password')
        setErrMsg('Fail')
    }
  }


    let resetPassword=useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },onSubmit:(values)=>{
            resetPasswordFuction(values)
        }
    })
    if(loading)<Loading/>
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="container my-5">
    <h2 className="text-main fw-bolder">Reset Password </h2>
    {errMsg? <div className="alert alert-danger my-2" role="alert">
              {errMsg}
            </div>:''}
    <form onSubmit={resetPassword.handleSubmit}>
        <input type="email" placeholder='userEmail' className='form-control my-2'value={resetPassword.values.email}onChange={resetPassword.handleChange} onBlur={resetPassword.handleBlur} name='email'/>
        <input type="password" placeholder='UseNewPassword' className='form-control my-2'value={resetPassword.values.newPassword}onChange={resetPassword.handleChange} onBlur={resetPassword.handleBlur} name='newPassword'/>

        <button type="submit" className='btn bg-main text-white my-2'>Submit</button>
    </form>
    </div>
    
    </>
  )
}

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function VerifyResetCode() {
    let[errMsg,setErrMsg]=useState('')
    let [loading,setLoading]=useState(false)
    let navigate=useNavigate()
  async function resetCodeValidation(resetCode) {
    try {
        setLoading(true)
        let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
        console.log(data)
        if (data.status === "Success") {
            navigate("/resetPassword");
            setLoading(false);
            toast.success('Correct Code')
          }
    } catch (error) {
        toast.error('inCorrect Code')
        setErrMsg('Fail')
    }
  }


    let verifyCode=useFormik({
        initialValues:{
            resetCode:''
        },onSubmit:(resetCode)=>{
            resetCodeValidation(resetCode)
        }
    })
    if(loading)<Loading/>
  return (
    <>


<Helmet>
        <meta charSet="utf-8" />
        <title>Verify Code Page</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    <div className="container my-5">
    <h2 className="text-main fw-bolder">Enter Verify Code </h2>
    {errMsg? <div className="alert alert-danger my-2" role="alert">
              {errMsg}
            </div>:''}
    <form onSubmit={verifyCode.handleSubmit}>
        <input type="text" placeholder='VerifyCode' className='form-control my-2'value={verifyCode.values.resetCode}onChange={verifyCode.handleChange} onBlur={verifyCode.handleBlur} name='resetCode'/>
        <button type="submit" className='btn bg-main text-white my-2'>Submit</button>
    </form>
    </div>
    
    </>
  )
}

import React from 'react'
import err from '../../assets/images/error.svg'
export default function Notfound() {
  return (
    <div className='d-flex justify-content-center align-items-center m-5'>
     <img src={err} alt="404error"  />
    </div>
  )
}

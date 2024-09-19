import React from 'react'
import loader from "../../../assets/Loader3.gif";
import './Loader.css'

const Loader = () => {
  return (
    <div className='loader-container'>
        <img src={loader} alt="Loading..." />
    </div>
  )
}

export default Loader
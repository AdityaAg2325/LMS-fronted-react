import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    useEffect(() => {
        if(auth?.role === 'ROLE_ADMIN'){
            navigate('/admin')
        } else if(auth?.role === 'ROLE_USER'){
            navigate('/user')
        } else {
            navigate('/')
        }
    },[])
  return (
    <div></div>
  )
}

export default NotFound
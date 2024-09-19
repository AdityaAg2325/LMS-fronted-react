import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AdminRoutes = ({children}) => {
    const auth = useSelector((state) => state.auth)
    const [isVerified, setIsVerified] = useState(false)

    useEffect(() => {
        if (auth && auth.token){
            try{
                if(auth.role === 'ROLE_ADMIN'){
                    setIsVerified(true)
                }
            } catch(error){
                console.log(error)
                setIsVerified(false)
            }
        }
    }, [auth])
  return isVerified ? children : <div></div>
}

export default AdminRoutes
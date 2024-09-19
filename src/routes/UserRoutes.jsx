import React from 'react'
import { useSelector } from 'react-redux'

const UserRoutes = ({children}) => {
    const auth = useSelector((state) => state.auth)
  return auth && auth.token ? children : <div></div>
}

export default UserRoutes
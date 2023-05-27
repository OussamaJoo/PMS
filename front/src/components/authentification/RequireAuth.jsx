import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const RequireAuth = ({allowedRoles}) => {
  const location=useLocation()
    const authReducer = useSelector((state) => state.authReducer)
    const {BearerToken} =authReducer
    if(BearerToken!=null) {
    const token = BearerToken.replace('Bearer','');
    const jwt = jwt_decode(token);
    console.log(jwt)
    
    
      return (
    
        jwt?.role?.find(r=>allowedRoles?.includes(r)) 
                ? <Outlet/> 
                : jwt?.sub 
                    ? <Navigate to="/unauthorized" state={{ from:location}} replace />
                    : <Navigate to="/login" state={{ from:location}} replace />
      )
    }
    else {
      return (
        <Navigate to="/login"  />
      )
    }
  
}

export default RequireAuth
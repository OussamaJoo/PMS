import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRoles } from '../../../redux/actions/rolePermissionAction';


const ListRoles = () => {

    const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { listRoles, error, loading } = rolePermissionReducer
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoles())
    
  }, [dispatch])
  return (
    <div className="content-wrapper">

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Roles</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  
    <section className="content">
      <div className="container-fluid">
     
      
        <div className="row">
            {listRoles.map(role=>
               
               <div className="col-12 col-sm-6 col-md-3">
               <div className="info-box mb-3">
                 <span className="info-box-icon bg-warning elevation-1">{role.roleName[0]}</span>
   
                 <div className="info-box-content">
                   <span className="info-box-number">{role.roleName}</span>
               
                 </div>
                 
               </div>
               
             </div>
           )}
           

            
        
          
        </div>
        
      </div>
    </section>
    
  </div>
  )
}

export default ListRoles
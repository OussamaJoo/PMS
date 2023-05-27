import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getRoleById, removeSelectedRole } from '../../../redux/actions/rolePermissionAction'

const DetailRole = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { idRole } = useParams()

  
  


  const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { role } = rolePermissionReducer

  

  useEffect(() => {
    dispatch(getRoleById(idRole))
    return ()=>{
        dispatch(removeSelectedRole())
    }
  }, [dispatch])
  return (
    <div className="content-wrapper">

    <div className="content-header">
      <div className="container-fluid">{role.roleName}
     
      
      </div>
      {role.permissions?.map(perms=>
      <li>{perms.nomPermission}</li> 
        )}</div>
      </div>
  )
}

export default DetailRole
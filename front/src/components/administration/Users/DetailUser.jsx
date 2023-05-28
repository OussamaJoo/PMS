import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, getRoles ,saveRole,addRoleToPermission, getRoleById} from "../../../redux/actions/rolePermissionAction"
import { getUserById, removeSelectedUser, saveUser, updateUser } from '../../../redux/actions/userAction';
import img1 from '../../../placeholder.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import LoadingSpinner from '../../globalComponenet/LoadingSpinner';
import { loadingComponent } from '../../../redux/actions/loadingAction'


const DetailUser = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { idUser } = useParams()
 
  const userReducer = useSelector((state) => state.userReducer)
  const { user } = userReducer

  const loadingReducer = useSelector((state) => state.loadingReducer)
  const {loading} =loadingReducer

  const [userUpdate, setuserUpdate] = useState({
      nom: '',
      prenom:'',
      email:'',
      plainPassword:'',
      telephone:''

    })


  const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { listRoles, listPermissions  } = rolePermissionReducer

 

  useEffect(() => {
    dispatch(getUserById(idUser))
    //fetchData();
    return () => {
        dispatch(removeSelectedUser())
     }
  },[dispatch]); 
  useEffect(() => {
    if(user){
      setuserUpdate(user)
    }
  }, [user])

  const UserUpdate = e => {
    e.preventDefault()
    dispatch(updateUser(userUpdate,idUser,navigate))
    dispatch(loadingComponent()) 
    setTimeout(() => {
      dispatch(getUserById(idUser))
    }, 100);
}


    const onChangeValue = (e) => {
        setuserUpdate(
            {
                ...userUpdate,
                [e.target.name]: e.target.value,
            }
        )
    }



  const [role, setrole] = useState({
    roleName:''
  })

  const [RolePermissionForm, setRolePermissionForm] = useState({
    roleName:'',
    listPermission:[]
  })



  return (
    <div className="content-wrapper">
        {loading ? <LoadingSpinner /> : <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h5>User/{user.id}</h5>
              <button className='btn bg-olive' onClick={(e) => UserUpdate(e)}>Modifier</button>
              <Link className='ml-1 btn bg-white' to={'/administration'}>Annuler</Link>
            </div>
           
          </div>
        </div>
      </section>
      <div className="card container">

        <div className="card-body">

          <form encType="multipart/form-data">

            <div className='row'>
              <div className='col-md-6 col-sm-6 col-6'>
              <div className="form-group">
                  <label htmlFor="exampleInputBorder">Email</label>
                  <input type="text" className="form-control form-control-border" placeholder="Email"
                    name='email' value={userUpdate.email || ""} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Password</label>
                  <input type="password" className="form-control form-control-border" placeholder="Password"
                    name='plainPassword' value={""} onChange={onChangeValue}/>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'></div>
              <div className=' col-md-4 col-sm-4 col-4'>
                <div className="form-group">
                <img src={user?.image?.includes('.') ? process.env.PUBLIC_URL + '/img-users/'+user?.matricule+user?.image:img1} className="float-right  brand-image img-rectangle elevation-1" style={{ opacity: '.8', width: '100px' }} />
                </div>
              </div>
            </div>
           
            <div className='row ' style={{marginTop:"100px",marginBottom:"50px"}}>
                    <div className='col-6' style={{marginTop:'-70px'}}>
                      <div className='row'>
                     
                        <div className='col-3'>
                          <small><b>Nom</b></small>
                        </div>
                        <div className='col-8'>
                          <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='nom' value={userUpdate.nom ||""} onChange={onChangeValue}/>
                        </div>
                        <div className='col-3 '>
                          <small><b>Prenom</b></small>
                        </div>
                        <div className='col-8'>
                        <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='prenom' value={userUpdate.prenom || ""} onChange={onChangeValue}/>
                        </div>
                        <div className='col-3 '>
                          <small><b>Telephone</b></small>
                        </div>
                        <div className='col-8'>
                        <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='telephone' value={userUpdate.telephone || ""}  onChange={onChangeValue}/>
                        </div>
                      </div>
                    </div>
                    <div className='col-6' style={{marginTop:'-38px'}}>
                      <div className='row'>
                        <div className='col-3'>
                          <small><b>Role</b></small>
                        </div>
                        <div className='col-8'>

                          
                        {listRoles.filter(j=> user.role == "/api/roles/"+j.id).map(f=> <p>{f.roleName}</p>)}
                        </div>
                        
                       
                        
                      </div>

                    </div>

                  </div>
            
          </form>
        </div>
      </div>
      </> }
    
    </div>
  )
}

export default DetailUser
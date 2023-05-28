
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, getRoles ,saveRole,addRoleToPermission} from "../../../redux/actions/rolePermissionAction"
import { saveUser, uploadImageUser } from '../../../redux/actions/userAction';
import img1 from '../../../placeholder.png'


const FormAddUser = () => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { listRoles, listPermissions } = rolePermissionReducer


  useEffect(() => {
    dispatch(getPermissions())
    dispatch(getRoles())
  }, [dispatch])


  const [user, setuser] = useState({
      email:'',
      plainPassword:'',
      nom:'',
      prenom:'',
      telephone:'',
      image:'',
      role:['']
  })

  const onChangeValue = (e) => {
    setuser(
      {
        ...user,
        [e.target.name]: e.target.value,
      }
    )
  }

  const addUser=(e)=>{
    e.preventDefault()
    dispatch(saveUser(user,navigate))
    /*image.append('name', user.matricule);
        dispatch(uploadImageUser(image));*/
    
    
  }



  const [image, setimage] = useState(null)
  const [imagePreview,setImagePreview] =useState(null)
  const handleUploadClick=(e)=>{
    let file=e.target.files[0]
    const image=new FormData()
    image.append('imageFile',file)
    setimage(image)
    console.log(e.target.files[0])
    setImagePreview(URL.createObjectURL(file))
    setuser({
      ...user,
      image:file.name.substring(file.name.indexOf('.')) 
    })
    
  }

  const [open, toggleOpen] = useState(false);
  const handleClose = () => {   // close the dialog
   
    toggleOpen(false);
  };


  const [role, setrole] = useState({
    name:'',
    roleName:'',
    status:true,

  })

  const [RolePermissionForm, setRolePermissionForm] = useState({
    roleName:'',
    listPermission:[]
  })


  

    const addRole = e => {
    e.preventDefault()
    dispatch(saveRole(role))
    setTimeout(() => {
      dispatch(getRoles())
      
      
      
    },1000);
    handleClose()
  }

  const changeRole=(e)=>{
    setrole(
      {
        ...role,
        status : true,
        [e.target.name]: e.target.value,
      }
    )
  }
  



  

  
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h5>Utilisateur/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => addUser(e)}>Sauvegarder</button>
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
                  <label htmlFor="exampleInputBorder">Email </label>
                  <input type="text" className="form-control form-control-border" placeholder=""
                    name='email' value={user.email} onChange={onChangeValue} />
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-4'></div>
              <div className=' col-md-2 col-sm-2 col-2'>
                <div className="form-group">
                <label  for="inputGroupFile01"><img src={imagePreview!=null ? imagePreview:img1}  className="float-right  brand-image img-rectangle elevation-1" style={{ opacity: '.8', width: '100px' ,height:'100px' }} /></label>
                     <input type="file"   class="custom-file-input" id="inputGroupFile01"/>
                </div>
              </div>
            </div>
            <div className='row'>
                    <div className='col-6' style={{marginTop:'-70px'}}>
                      <div className='row'>
                      <div className='col-3'>
                          <small><b>Mot de Passe</b></small>
                        </div>
                        <div className='col-8'>
                          <input type="password" className="form-control form-control-sm form-control-border border-dark" 
                            name='plainPassword' value={user.plainPassword} onChange={onChangeValue} />
                        </div>
                        <div className='col-3'>
                          <small><b>Nom</b></small>
                        </div>
                        <div className='col-8'>
                          <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='nom' value={user.nom} onChange={onChangeValue} />
                        </div>
                        <div className='col-3 '>
                          <small><b>Prenom</b></small>
                        </div>
                        <div className='col-8'>
                        <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='prenom' value={user.prenom} onChange={onChangeValue} />
                        </div>
                        <div className='col-3 '>
                          <small><b>Telephone</b></small>
                        </div>
                        <div className='col-8'>
                        <input type="text" className="form-control form-control-sm form-control-border border-dark" 
                            name='telephone' value={user.telephone} onChange={onChangeValue} />
                        </div>
                      </div>
                    </div>
                    <div className='col-6' style={{marginTop:'-38px'}}>
                      <div className='row'>
                        <div className='col-3'>
                          <small><b>Role</b></small>
                        </div>
                        <div className='col-8'>

                        <select className="form-control  form-control-border form-control-sm"
                        value={user?.role.id}
                        onChange={(e) => { setuser({ ...user, role:  ['/api/roles/'+e.target.value] }) }}>
                        <option selected>-----</option>
                        {
                          listRoles.map(f =>
                            <option key={f.id} value={f.id} >{f.roleName}</option>
                          )}
                      </select>
                       
                        </div>
                      
                      </div>
                            
                      

                    </div>
                                  
                  </div>
                                  
          </form>
        </div>

        


      </div>
      
        
       
    </div>
    
  )
}

export default FormAddUser
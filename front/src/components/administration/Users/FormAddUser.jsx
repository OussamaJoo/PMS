
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions, getRoles } from "../../../redux/actions/rolePermissionAction"
import { saveUser ,sendMail} from '../../../redux/actions/userAction';
import {getClient} from "../../../redux/actions/clientAction"
import { getEtablissement } from '../../../redux/actions/etablissementAction';

import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const FormAddUser = () => {

  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { listRoles } = rolePermissionReducer

  const clients = useSelector((state) => state.clientReducer)
  const {listClient} = clients

  const etabs = useSelector((state) => state.etablissementReducer)
  const {listEtablissement} = etabs


  useEffect(() => {
    dispatch(getPermissions())
    dispatch(getRoles())
    dispatch(getClient)
    dispatch(getEtablissement)
  }, [dispatch])


  const [user, setuser] = useState({
    email: '',
    plainPassword: '',
    nom: '',
    prenom: '',
    telephone: '',
    image: '',
    role: [''],
    idClient:null,
    idEtablissement:null
  })

  const onChangeValue = (e) => {
    setuser(
      {
        ...user,
        [e.target.name]: e.target.value,
      }
    )
  }

  const [mail,setmail] = useState()

  const addUser = (e) => {
    e.preventDefault()
    dispatch(saveUser(user, navigate))
    
    if(user.nomEtab){
      console.log(user)
      dispatch(sendMail({etab:user.nomEtab,mail:user.email,text:''}, navigate))
    }else{
      console.log(user)
      dispatch(sendMail({etab:user.nomClient,mail:user.email,text:''}, navigate))
    }
    


    /*image.append('name', user.matricule);
        dispatch(uploadImageUser(image));*/


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
              
            </div>
            <div className='row'>
              <div className='col-6' >
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
              <div className='col-6' >
                <div className='row'>
                  <div className='col-3'>
                    <small><b>Role</b></small>
                  </div>
                  <div className='col-8'>

                    <select className="form-control  form-control-border form-control-sm"
                      value={user?.role.id}
                      onChange={(e) => { setuser({ ...user, role: ['/api/roles/' + e.target.value] }) }}>
                      <option selected>-----</option>
                      {
                        listRoles.map(f =>
                          <option key={f.id} value={f.id} >{f.roleName}</option>
                        )}
                    </select>

                  </div>

               

                 

                </div>

                {user?.role[0] === '/api/roles/'+5 ? 
                  <div className='row'>
                  <div className='col-3'>
                    <small><b>Client</b></small>
                  </div>
                  <div className='col-8'>
                  <Autocomplete
                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={user.nomClient}
                    onChange={(evt, newValue) => {


                      setuser({ ...user, nomClient: newValue?.nom , idClient : '/api/clients/'+newValue?.id })
                     
                      

                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);




                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={listClient}
                    getOptionLabel={(option) => {
                      // e.g value selected with enter, right from the input
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.nom;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                    sx={{ width: 200 }}
                    freeSolo
                    renderInput={(params) => <TextField placeholder="Enter Type" variant="standard" size="small" {...params} />}
                  />
                  </div>
                  </div> : user?.role[0] === '/api/roles/'+7 ?  <div className='row'>
                  <div className='col-3'>
                    <small><b>Etablissement</b></small>
                  </div>
                  <div className='col-8'>
                  <Autocomplete
                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={user.nomEtab}
                    onChange={(evt, newValue) => {


                      setuser({ ...user, nomEtab: newValue?.nom , idEtablissement : '/api/etablissements/'+newValue?.id })
                     
                      

                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);




                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={listEtablissement}
                    getOptionLabel={(option) => {
                      // e.g value selected with enter, right from the input
                      if (typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                      return option.nom;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                    sx={{ width: 200 }}
                    freeSolo
                    renderInput={(params) => <TextField placeholder="Enter Type" variant="standard" size="small" {...params} />}
                  />
                  </div>
                  </div> : null}



              </div>

            </div>

          </form>
        </div>




      </div>



    </div>

  )
}

export default FormAddUser
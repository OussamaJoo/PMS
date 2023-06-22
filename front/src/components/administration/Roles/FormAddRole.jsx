import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import { saveRole } from '../../../redux/actions/rolePermissionAction'


const FormAddRole = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [role, setrole] = useState({
    name: '',
    roleName:'',
    status:true
  


  })



  const savecarre = e => {
    e.preventDefault()
    dispatch(saveRole(role, navigate))
  }

  const onChangeValue = (e) => {
    setrole(
      {
        ...role,
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
              <h5>Role/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/administration'}>Annuler</Link>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Invoice</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">

          <form encType="multipart/form-data">

            <div className='row'>
              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Nom </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='name' value={role.name} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Type</label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='roleName' value={role.roleName} onChange={onChangeValue} />
                </div>
        
              </div>
    
            </div>
          </form>
        </div>
      </div>
   
    </div>
    
  )
}

export default FormAddRole
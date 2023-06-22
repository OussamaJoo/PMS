import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import { saveTypeEtabs } from '../../../redux/actions/typeEtabAction'
import { toast } from "react-toastify"


const FormAddType = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [type, settype] = useState({
    nom: '',
    etat:true
  


  })



  const savecarre = e => {
    e.preventDefault()
    if(type.nom == null){
      toast.error("il faut remplir tous les champs", { position: toast.POSITION.BOTTOM_LEFT })
    }else{
      dispatch(saveTypeEtabs(type, navigate))
    }
    
  }

  const onChangeValue = (e) => {
    settype(
      {
        ...type,
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
              <h5>Type/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/types'}>Annuler</Link>
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
                    name='nom' value={type.nom} onChange={onChangeValue} />
                </div>
        
              </div>
    
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddType
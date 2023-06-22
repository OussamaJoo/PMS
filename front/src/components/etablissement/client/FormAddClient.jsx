import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveClient } from '../../../redux/actions/clientAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {toast} from "react-toastify"



const FormAddClient = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [client, setclient] = useState({
    nom: '',
    description: '',
    adresse: '',




  })






  const savecarre = e => {
    e.preventDefault()
    if (client.nom == '' || client.description == '' || client.adresse == '') {
      toast.error("il faut remplir tous les champs", { position: toast.POSITION.BOTTOM_LEFT })
    } else {
      dispatch(saveClient(client, navigate))
    }



  }

  const onChangeValue = (e) => {
    setclient(
      {
        ...client,
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
              <h5>Client/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/clients'}>Annuler</Link>
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
                    name='nom' value={client.nom} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Description </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='description' value={client.description} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Adresse </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='adresse' value={client.adresse} onChange={onChangeValue} />
                </div>

              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddClient
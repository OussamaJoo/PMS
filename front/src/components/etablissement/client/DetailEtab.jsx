import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getClientById, removeSelectedClient, updateClient } from '../../../redux/actions/clientAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailClient = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idClient } = useParams()

  const cl = useSelector((state) => state.clientReducer)
  const { client } = cl
 
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [clientUpdate, setclientUpdate] = useState({
    nom: '',
    description: '',
    adresse: '',
    

  })


 


  useEffect(() => {
    dispatch(getClientById(idClient))

    return () => {
      dispatch(removeSelectedClient())

    }
  }, [dispatch]);
  useEffect(() => {
    if (client) {

      setclientUpdate({ ...clientUpdate, nom: client.nom, description: client.description, adresse : client.adresse })

    }
  }, [client])

  const ClientUpdate = e => {
    e.preventDefault()
    dispatch(updateClient(clientUpdate, idClient, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getClientById(idClient))
    }, 100);
  }

  const onChangeValue = (e) => {
    setclientUpdate(
      {
        ...clientUpdate,
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

              <h5>Client/{client.id}</h5>
              <button className='btn bg-olive' onClick={(e) => ClientUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/clients'}>Annuler</Link>
            </div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>

              <div className='row'>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Nom</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='nom' value={clientUpdate.nom || ""} onChange={onChangeValue} />
                  </div>

                </div>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Description</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='description' value={clientUpdate.description || ""} onChange={onChangeValue} />
                  </div>

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Adresse</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='adresse' value={clientUpdate.adresse || ""} onChange={onChangeValue} />
                  </div>

                </div>

               

              </div>

            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailClient
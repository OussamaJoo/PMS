import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getEtablissementById, removeSelectedEtablissement, updateEtablissement } from '../../../redux/actions/etablissementAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailEtab = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idEtab } = useParams()

  const etabReducer = useSelector((state) => state.etablissementReducer)
  const { etablissement } = etabReducer
  const typeReducer = useSelector((state) => state.typeEtabReducer)
  const { typeEtab } = typeReducer
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [etabUpdate, setetabUpdate] = useState({
    nom: '',
    description: '',
    nomType: '',
    typeEtablissement: ''

  })


  const types = useSelector((state) => state.typeEtabReducer)
  const { listTypes } = types


  useEffect(() => {
    dispatch(getEtablissementById(idEtab))

    return () => {
      dispatch(removeSelectedEtablissement())

    }
  }, [dispatch]);
  useEffect(() => {
    if (etablissement) {

      setetabUpdate({ ...etablissement, nom: etablissement.nom, description: etablissement.description, nomType: etablissement?.typeEtablissement?.nom, typeEtablissement: '/api/type_etablissements/' + etablissement?.typeEtablissement?.id })

    }
  }, [etablissement])

  const EtabUpdate = e => {
    e.preventDefault()
    dispatch(updateEtablissement(etabUpdate, idEtab, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getEtablissementById(idEtab))
    }, 100);
  }

  const onChangeValue = (e) => {
    setetabUpdate(
      {
        ...etabUpdate,
        [e.target.name]: e.target.value,
      }
    )
  }
  const search = JSON.parse(localStorage.getItem('search'));

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Etablissement/{etablissement.id}</h5>
              <button className='btn bg-olive' onClick={(e) => EtabUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/etablissements'}>Annuler</Link>
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
                      name='nom' value={etabUpdate.nom || ""} onChange={onChangeValue} />
                  </div>

                </div>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Description</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='description' value={etabUpdate.description || ""} onChange={onChangeValue} />
                  </div>

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Type </label>
                  </div>



                  <Autocomplete
                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={etabUpdate.nomType}
                    onChange={(evt, newValue) => {


                      setetabUpdate({ ...etabUpdate, nomType: newValue?.nom || etabUpdate.nomType, typeEtablissement: '/api/type_etablissements/' + newValue?.id })



                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);




                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={listTypes}
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

                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => <TextField placeholder="Enter Type" variant="standard" size="small" {...params} />}
                  />
                </div>

              </div>

            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailEtab
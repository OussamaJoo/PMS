import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTarifById, removeSelectedTarif, updateTarif } from '../../../redux/actions/tarifAction'

import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';


const DetailTarif = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filter = createFilterOptions();
  const { idTarif } = useParams()

  const tarifReducer = useSelector((state) => state.tarifReducer)
  const { tarif } = tarifReducer
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [tarifUpdate, settarifUpdate] = useState({
    date: new Date(),
    montant: '',
    nomTypologie: '',
    typologie: '',

  })

  const typologieReducer = useSelector((state) => state.typologieReducer)
  const { listTypologies } = typologieReducer

  useEffect(() => {
    dispatch(getTarifById(idTarif))

    return () => {
      dispatch(removeSelectedTarif())
    }
  }, [dispatch]);
  useEffect(() => {
    if (tarif) {
      settarifUpdate({...tarifUpdate, date: tarif.date, nomTypologie: tarif?.typologie?.nom + ' ' + tarif?.typologie?.etablissement?.nom || '', montant: tarif.montant, typologie: tarif?.typologie?.id })
  
    }
  }, [tarif])

  const TarifUpdate = e => {
    e.preventDefault()
    dispatch(updateTarif(tarifUpdate, idTarif, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getTarifById(idTarif))
    }, 1000);
  }



  const onChangeValue1 = (e) => {
    settarifUpdate(
      {
        ...tarifUpdate,
        [e.target.name]: parseFloat(e.target.value),
      }
    )
  }

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Disponibilité/{tarif.id}</h5>
              <button className='btn bg-olive' onClick={(e) => TarifUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/disponibilite/tarifs'}>Annuler</Link>
            </div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>
              <div className='row'>
                <div className='col-md-4 col-sm-4 col-4'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Etablissement </label>
                    <h5>{tarif?.typologie?.etablissement.nom}</h5>

                  </div>
                </div>
                <div className='col-md-10 col-sm-10 col-10'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Date </label>

                    <DateTimePickerComponent value={tarifUpdate.date} onChange={e => settarifUpdate({ ...tarifUpdate, date: e.target.value })} placeholder='Choose a date and time'></DateTimePickerComponent>
                  </div>
                </div>

                <div className='col-md-6 col-sm-6 col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Montant </label>

                    <input type="number" className="form-control form-control-border" placeholder="Ecrire Ici"
                      name='montant' value={tarifUpdate.montant} onChange={onChangeValue1} />
                  </div>
                </div>

                <div className='col-md-4 col-sm-4 col-4'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Typologie </label>

                    <Autocomplete
                      PaperProps={{
                        style: {

                          width: '50px'
                        },
                      }}
                      value={tarifUpdate.nomTypologie || ''}
                      onChange={(evt, newValue) => {


                        settarifUpdate({ ...tarifUpdate, nomTypologie: newValue?.nom + ' ' + newValue?.etablissement.nom, typologie: newValue?.id })



                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);




                        return filtered;
                      }}
                      id="free-solo-dialog-demo"
                      options={listTypologies}
                      getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === 'string') {
                          return option;
                        }
                        if (option.inputValue) {
                          return option.inputValue + ' ' + option?.etablissement.nom || '';
                        }
                        return option.nom + ' ' + option?.etablissement.nom || '';
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      renderOption={(props, option) => <li {...props}>{option.nom + ' ' + option.etablissement.nom}</li>}

                      sx={{ width: 300 }}
                      freeSolo
                      renderInput={(params) => <TextField placeholder="Enter Type" variant="standard" size="small" {...params} />}
                    />
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

export default DetailTarif
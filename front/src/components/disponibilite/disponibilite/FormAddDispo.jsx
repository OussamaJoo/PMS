import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveDispo } from '../../../redux/actions/dispoAction'
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { loadingComponent } from '../../../redux/actions/loadingAction'


const FormAddDispo = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [dispo, setdispo] = useState({
    dateDe: new Date(),
    dateAu: new Date(),
    qte: '',
    nomTypologie: '',
    typologie: '',
    etab: '',
    nomEtab: ''



  })


  const typologieReducer = useSelector((state) => state.typologieReducer)
  const { listTypologies } = typologieReducer
  const etabReducer = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabReducer


  const savecarre = e => {
    e.preventDefault()
    dispatch(saveDispo(dispo, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {

    }, 1000);
  }

  const onChangeValue1 = (e) => {
    setdispo(
      {
        ...dispo,
        [e.target.name]: parseInt(e.target.value),
      }
    )
  }


  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h5>Disponiblité/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/disponibilite/disponibilites'}>Annuler</Link>
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
              <div className='col-3'>
                <small><b>Du</b></small>
              </div>
              <div className='col-8'>

                <DateTimePickerComponent value={dispo.dateDe} onChange={e => setdispo({ ...dispo, dateDe: e.target.value })} placeholder='Choose a date and time'></DateTimePickerComponent>
                {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
              </div>
              <div className='col-3'>
                <small><b>Au</b></small>
              </div>
              <div className='col-8'>

                <DateTimePickerComponent value={dispo.dateAu} onChange={e => setdispo({ ...dispo, dateAu: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
              </div>


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
                  value={dispo.nomEtab}
                  onChange={(evt, newValue) => {


                    setdispo({ ...dispo, nomEtab: newValue?.nom, etab: newValue?.id })



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
                      return option || '';
                    }
                    if (option.inputValue) {
                      return option.nom;
                    }
                    return option.nom;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                  sx={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => <TextField placeholder="Enter Etablissement" variant="standard" size="small" {...params} />}
                />
              </div>



              <div className='col-3'>
                <small><b>Typologie</b></small>
              </div>


              <div className='col-8'>
                <Autocomplete

                  PaperProps={{
                    style: {

                      width: '50px'
                    },
                  }}
                  value={dispo.nomTypologie}
                  onChange={(evt, newValue) => {


                    setdispo({ ...dispo, nomTypologie: newValue?.nom , typologie: newValue?.id })



                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);




                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={listTypologies.filter(p => p.etablissement?.id === dispo.etab)}
                  getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option || '';
                    }
                    if (option.inputValue) {
                      return option.nom;
                    }
                    return option.nom;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                  sx={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => <TextField placeholder="Enter Typologie" variant="standard" size="small" {...params} />}
                />
              </div>

              <div className='col-3'>
                <small><b>Quantité</b></small>
              </div>
              <div className='col-8'>

                <input type="number" className="form-control form-control-border" placeholder="0"
                  name='qte' value={dispo.qte} onChange={onChangeValue1} />
              </div>


            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddDispo
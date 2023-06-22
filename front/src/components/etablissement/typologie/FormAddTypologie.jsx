import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveTypologie } from '../../../redux/actions/typologieAction'
import ToggleButton from 'react-toggle-button'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast } from "react-toastify"



const FormAddTypologie = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filter = createFilterOptions();
  const [typologie, settypologie] = useState({
    nom: '',
    categorie: '',
    capacite: '',
    nomEtablissement: '',
    acceptEnfant: false,
    accecptBebe: false,
    acceptHandicapé: false,
    annulable: false,
    remborsable: false



  })

  const etabs = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabs



  const savecarre = e => {
    e.preventDefault()
    if (typologie.nom == '' && typologie.nomEtablissement == '' && typologie.capacite == '') {
      toast.error("il faut remplir tous les champs", { position: toast.POSITION.BOTTOM_LEFT })
    } else {
      dispatch(saveTypologie(typologie, navigate))
    }


  }

  const onChangeValue = (e) => {
    settypologie(
      {
        ...typologie,
        [e.target.name]: e.target.value,
      }
    )
  }

  const onChangeValue1 = (e) => {
    settypologie(
      {
        ...typologie,
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
              <h5>Typologie/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/typologies'}>Annuler</Link>
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
              <div className='col-md-6 col-sm-6 col-6'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Nom </label>

                  <input typologie="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='nom' value={typologie.nom} onChange={onChangeValue} />
                </div>
              </div>

              <div className='col-md-4 col-sm-4 col-4'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Etablissement </label>
                  <Autocomplete

                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={typologie.nomEtablissement}
                    onChange={(evt, newValue) => {


                      settypologie({ ...typologie, nomEtablissement: newValue?.nom, etablissement: '/api/etablissements/' + newValue?.id })



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
                        return option.inputValue || '';
                      }
                      return option.nom
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




              <div className='col-md-6 col-sm-6 col-6'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Capacité </label>

                  <input type="number" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='capacite' value={typologie.capacite} onChange={onChangeValue1} />
                </div>
              </div>



              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Accept enfant </label>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'>
                <ToggleButton
                  inactiveLabel={'no'}
                  activeLabel={'yes'}
                  value={typologie.acceptEnfant || false}

                  onToggle={(value) => {
                    settypologie({
                      ...typologie,
                      acceptEnfant: !value,
                    })
                  }} />


              </div>

              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Accept bebe </label>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'>
                <ToggleButton
                  inactiveLabel={'no'}
                  activeLabel={'yes'}
                  value={typologie.accecptBebe || false}

                  onToggle={(value) => {
                    settypologie({
                      ...typologie,
                      accecptBebe: !value,
                    })
                  }} />

              </div>

              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Accept handicapé </label>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'>
                <ToggleButton
                  inactiveLabel={'no'}
                  activeLabel={'yes'}
                  value={typologie.acceptHandicapé || false}

                  onToggle={(value) => {
                    settypologie({
                      ...typologie,
                      acceptHandicapé: !value,
                    })
                  }} />

              </div>

              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Annulable</label>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'>
                <ToggleButton
                  inactiveLabel={'no'}
                  activeLabel={'yes'}
                  value={typologie.annulable || false}

                  onToggle={(value) => {
                    settypologie({
                      ...typologie,
                      annulable: !value,
                    })
                  }} />

              </div>

              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Remborsable</label>
                </div>
              </div>
              <div className='col-md-2 col-sm-2 col-2'>
                <ToggleButton
                  inactiveLabel={'no'}
                  activeLabel={'yes'}
                  value={typologie.remborsable || false}

                  onToggle={(value) => {
                    settypologie({
                      ...typologie,
                      remborsable: !value,
                    })
                  }} />

              </div>
              {JSON.stringify(typologie)}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddTypologie
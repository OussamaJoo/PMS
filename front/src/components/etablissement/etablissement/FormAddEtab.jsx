import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveEtablissement } from '../../../redux/actions/etablissementAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



const FormAddEtab = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [etab, setetab] = useState({
    nom: '',
    description: '',
    nomType:'',
    typeEtablissement: ''



  })


  const types = useSelector((state) => state.typeEtabReducer)
  const { listTypes } = types



  const savecarre = e => {
    e.preventDefault()
   
    dispatch(saveEtablissement(etab, navigate))

  }

  const onChangeValue = (e) => {
    setetab(
      {
        ...etab,
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
              <h5>Etablissement/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/etablissements'}>Annuler</Link>
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
                    name='nom' value={etab.nom} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Description </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='description' value={etab.description} onChange={onChangeValue} />
                </div>
                <div className='row'>
                <div className='col-2'>
                <label htmlFor="exampleInputBorder">Type </label>
                        </div>
                        <div className='col-2'>


                  <Autocomplete
                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={etab.nomType}
                    onChange={(evt, newValue) => {


                      setetab({ ...etab, nomType: newValue?.nom , typeEtablissement : '/api/type_etablissements/'+newValue?.id })
                     
                      

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
                    sx={{ width: 200 }}
                    freeSolo
                    renderInput={(params) => <TextField placeholder="Enter Type" variant="standard" size="small" {...params} />}
                  />
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

export default FormAddEtab
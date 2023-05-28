import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveMealPlan } from '../../../redux/actions/mealPlanAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



const FormAddMeal = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [meal, setmeal] = useState({
    nom: '',
    description: '',
    nomEtab:'',
    etablissement: '',
    prix: ''




  })


  const etabs = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabs



  const savecarre = e => {
    e.preventDefault()
   
    dispatch(saveMealPlan(meal, navigate))

  }

  const onChangeValue = (e) => {
    setmeal(
      {
        ...meal,
        [e.target.name]: e.target.value,
      }
    )
  }

  const onChangeValue1 = (e) => {
    setmeal(
      {
        ...meal,
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
              <h5>MealPlan/Nouveau</h5>
              <button className='btn bg-olive' onClick={(e) => savecarre(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/mealPlans'}>Annuler</Link>
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
                  <label htmlFor="exampleInputBorder">Etablissement </label>
                  <Autocomplete
                    PaperProps={{
                      style: {

                        width: '50px'
                      },
                    }}
                    value={meal.nomEtab}
                    onChange={(evt, newValue) => {


                      setmeal({ ...meal, nomEtab: newValue?.nom , etablissement : '/api/etablissements/'+newValue?.id })
                     
                      

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
                    renderInput={(params) => <TextField placeholder="Enter Etablissement" variant="standard" size="small" {...params} />}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Nom </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='nom' value={meal.nom} onChange={onChangeValue} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Description </label>
                  <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                    name='description' value={meal.description} onChange={onChangeValue} />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputBorder">Prix </label>
                  <input type="number" className="form-control form-control-border" placeholder="0"
                    name='prix' value={meal.prix} onChange={onChangeValue1} />
                </div>

               
                
              
              </div>
{JSON.stringify(meal)}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormAddMeal
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMealPlanById, removeSelectedMealPlan, updateMealPlan } from '../../../redux/actions/mealPlanAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const DetailMeal = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idMeal } = useParams()

  const mealReducer = useSelector((state) => state.mealPlanReducer)
  const { mealPlan } = mealReducer
  const etabReducer = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabReducer
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [mealUpdate, setmealUpdate] = useState({
    nom: '',
    description: '',
    nomEtab: '',
    etablissement: '',
    prix: ''

  })


  const types = useSelector((state) => state.typeEtabReducer)
  const { listTypes } = types


  useEffect(() => {
    dispatch(getMealPlanById(idMeal))

    return () => {
      dispatch(removeSelectedMealPlan())

    }
  }, [dispatch]);
  useEffect(() => {
    if (mealPlan) {

      setmealUpdate({ ...mealUpdate, nom: mealPlan.nom, description: mealPlan.description, nomEtab: mealPlan?.etablissement?.nom, etablissement: '/api/etablissements/' + mealPlan?.etablissement?.id, prix: mealPlan.prix })

    }
  }, [mealPlan])

  const MealUpdate = e => {
    e.preventDefault()
    dispatch(updateMealPlan(mealUpdate, idMeal, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getMealPlanById(idMeal))
    }, 100);
  }

  const onChangeValue = (e) => {
    setmealUpdate(
      {
        ...mealUpdate,
        [e.target.name]: e.target.value,
      }
    )
  }

  const onChangeValue1 = (e) => {
    setmealUpdate(
      {
        ...mealUpdate,
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

              <h5>MealPlan/{mealPlan.id}</h5>
              <button className='btn bg-olive' onClick={(e) => MealUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/mealPlans'}>Annuler</Link>
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
                    <label htmlFor="exampleInputBorder">Etablissement </label>
                    <Autocomplete
                      PaperProps={{
                        style: {

                          width: '50px'
                        },
                      }}
                      value={mealUpdate.nomEtab}
                      onChange={(evt, newValue) => {


                        setmealUpdate({ ...mealUpdate, nomEtab: newValue?.nom, etablissement: '/api/etablissements/' + newValue?.id })



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
                </div>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Nom</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='nom' value={mealUpdate.nom || ""} onChange={onChangeValue} />
                  </div>

                </div>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Description</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='description' value={mealUpdate.description || ""} onChange={onChangeValue} />
                  </div>

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Prix </label>
                    <input type="number" className="form-control form-control-border" placeholder="0"
                      name='prix' value={mealUpdate.prix} onChange={onChangeValue1} />
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

export default DetailMeal
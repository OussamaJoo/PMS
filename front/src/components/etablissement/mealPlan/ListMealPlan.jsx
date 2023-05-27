import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMealPlan } from '../../../redux/actions/mealPlanAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListMealPlan = () => {
  const meals = useSelector((state) => state.mealPlanReducer)
  const { listMealPlan, error, loading } = meals
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authReducer)
  const { user } = auth
  const columns = [

    {
      Header: "Id",
      accessor: "id"
    },
    {
      Header: "Nom",
      accessor: "nom"
    },
    {
      Header: "Description",
      accessor: "description"
    },
    {
      Header: "Etablissement",
      accessor: "etablissement.nom"
    },

    {
      Header: "Prix",
      accessor: "prix"
    }
    
  ]

  useEffect(() => {
    dispatch(getMealPlan())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Meal Plan"
  const lienToAdd = "/etablissement/addmeal"
  const lienDetail = "/etablissement/mealPlan/"

  return (

<div>
{user.roles[0] =="ROLE_ADMIN" ? (
      
 <div className="content-wrapper">
  
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listMealPlan} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />

}


</div>
    ) : (
      
 <div className="content-wrapper">
  {user?.data?.roles[0]}
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listMealPlan} titre={titre} lienToAdd={null} lienDetail={null} />

}


</div>
    )}

</div>
    

  )
}

export default ListMealPlan
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMealPlanByIdEtab } from '../../../redux/actions/mealPlanAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListMealPlanResp = () => {
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const meals = useSelector((state) => state.mealPlanReducer)
  const { listMealPlanBYIDETAB, error, loading } = meals
  const dispatch = useDispatch()

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
      Header: "Prix",
      accessor: "prix"
    }
    
  ]

  useEffect(() => {
    dispatch(getMealPlanByIdEtab(user1.idEtablissement))
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Meal Plan"
  const lienToAdd = "/responsable/addmeal"
  const lienDetail = "/responsable/mealPlan/"

  return (

<div>

      
 <div className="content-wrapper">
  
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listMealPlanBYIDETAB} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />

}


</div>
    

</div>
    

  )
}

export default ListMealPlanResp
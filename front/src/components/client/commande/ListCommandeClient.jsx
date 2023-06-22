import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommandeByIdClient } from '../../../redux/actions/commandeAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import dateFormat from 'dateformat';

import { getEtablissement } from '../../../redux/actions/etablissementAction'
import { getTypeEtab } from '../../../redux/actions/typeEtabAction';
import { getMealPlan } from '../../../redux/actions/mealPlanAction';
import { getTypologie } from '../../../redux/actions/typologieAction';
import { getDispo } from '../../../redux/actions/dispoAction';
import { getTarif } from '../../../redux/actions/tarifAction';
import { getClient } from '../../../redux/actions/clientAction';

const ListCommandeClient = () => {
 
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const reserv = useSelector((state) => state.commandeReducer)
  const { listCommandeByIdClient, error, loading } = reserv
  const dispatch = useDispatch()


  const columns = [

    
    {
      Header: "Reference",
      accessor: "reference"
    },
    {
      Header: "Date",
      accessor: "date",
      Cell:({value})=> { return dateFormat(value, "yyyy-mm-dd")}
    },
  
    {
      Header: "Etablissement",
      accessor: "reservations[0].etablissement.nom",
     
    },
    {
      Header: "Etat",
      accessor: "etat",
     
    },


   
    
  
   

    
  ]

  useEffect(() => {
    console.log(user1.id)
    dispatch(getCommandeByIdClient(user1.idClient))
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getEtablissement())
    dispatch(getTypeEtab())
    dispatch(getMealPlan())
    dispatch(getTypologie())
    dispatch(getDispo())
    dispatch(getTarif())
    dispatch(getClient())
  }, [dispatch])

  const titre = "Reservations"
  const lienToAdd = "/etablissement/addReservation"
  const lienDetail = "/client/commande/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listCommandeByIdClient} titre={titre} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListCommandeClient
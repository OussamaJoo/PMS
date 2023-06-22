import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommandeByIdEtab } from '../../../redux/actions/commandeAction'
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

const ListCommandeResp = () => {
 
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const reserv = useSelector((state) => state.commandeReducer)
  const { listCommandeByIdEtab, error, loading } = reserv
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
      Header: "Client",
      accessor: "client.nom",
     
    },
    {
      Header: "Etat",
      accessor: "etat",
      color:"red",
     
    },


   
    
  
   

    
  ]

  useEffect(() => {
    
    dispatch(getCommandeByIdEtab(user1.idEtablissement))
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
  const lienDetail = "/responsable/commande/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listCommandeByIdEtab} titre={titre} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListCommandeResp
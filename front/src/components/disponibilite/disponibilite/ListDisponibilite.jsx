import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDispo } from '../../../redux/actions/dispoAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import dateFormat from 'dateformat';

const ListDisponibilite = () => {
  const dispos = useSelector((state) => state.dispoReducer)

  const { listDispo, error, loading } = dispos
  const dispatch = useDispatch()


  const columns = [

    {
      Header: "Id",
      accessor: "id"
    },
    {
      Header: "Date",
      accessor: "date",
      Cell:({value})=> { return dateFormat(value, "yyyy-mm-dd")}
    },
    {
      Header: "Quantités",
      accessor: "qte"
    },
    {
      Header: "Typologie",
      accessor: "typologie.nom",
    },
    {
      Header: "Etablissement",
      accessor: "typologie.etablissement.nom",
    },
    {
      Header: "Adresse",
      accessor: "typologie.etablissement.adresse",
    },
  
   

    
  ]

  useEffect(() => {
    dispatch(getDispo())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Disponibilité"
  const lienToAdd = "/disponibilite/addDispo"
  const lienDetail = "/disponibilite/dispo/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listDispo} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListDisponibilite
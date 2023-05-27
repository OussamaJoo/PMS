import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservation } from '../../../redux/actions/reservationAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import dateFormat from 'dateformat';

const ListReservation = () => {
  const reserv = useSelector((state) => state.reservationReducer)

  const { listReservation, error, loading } = reserv
  const dispatch = useDispatch()


  const columns = [

    
    {
      Header: "Etablissement",
      accessor: "etablissement.nom"
    },
    {
      Header: "Typologie",
      accessor: "typologie.nom"
    },
    {
      Header: "Date Debut",
      accessor: "dateDebut",
      Cell:({value})=> { return dateFormat(value, "yyyy-mm-dd")}
    },
    {
      Header: "Date Fin",
      accessor: "dateFin",
      Cell:({value})=> { return dateFormat(value, "yyyy-mm-dd")}
    },
   
    
  
   

    
  ]

  useEffect(() => {
    dispatch(getReservation())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Reservations"
  const lienToAdd = "/etablissement/addReservation"
  const lienDetail = "/etablissement/reservation/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listReservation} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListReservation
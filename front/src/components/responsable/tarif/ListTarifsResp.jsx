import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTarifByIdEtab } from '../../../redux/actions/tarifAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dateFormat from 'dateformat';

const ListTarifsResp = () => {
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const tarifs = useSelector((state) => state.tarifReducer)
  const { listTarifByIdEtab, error, loading } = tarifs
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
      Header: "prix",
      accessor: "montant"
    },
    {
      Header: "Typologie",
      accessor: "typologie.nom",
    },
    {
      Header: "Etablissement",
      accessor: "typologie.etablissement.nom",
    },
  
   

    
  ]

  useEffect(() => {
    dispatch(getAllTarifByIdEtab(user1.idEtablissement))
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Tarifs"
  const lienToAdd = "/responsable/addTarif"
  const lienDetail = "/responsable/tarif/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listTarifByIdEtab} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListTarifsResp
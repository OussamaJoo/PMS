import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDispoByIdEtab } from '../../../redux/actions/dispoAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import dateFormat from 'dateformat';

const ListDisponibiliteResp = () => {
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const dispos = useSelector((state) => state.dispoReducer)

  const { listDispoIdEtab, error, loading } = dispos
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

  
  
   

    
  ]

  useEffect(() => {
    dispatch(getDispoByIdEtab(user1.idEtablissement))
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Disponibilité"
  const lienToAdd = "/responsable/addDispo"
  const lienDetail = "/responsable/dispo/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listDispoIdEtab} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListDisponibiliteResp
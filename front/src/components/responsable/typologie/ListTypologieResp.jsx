import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypologieByIdEtab } from '../../../redux/actions/typologieAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListTypologieResp = () => {
  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer
  const typologies = useSelector((state) => state.typologieReducer)
  const { listTypologiesByIDEtab, error, loading } = typologies
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
      Header: "Capacité",
      accessor: "capacite"
    },
    

    
  ]

  useEffect(() => {
    dispatch(getTypologieByIdEtab(user1.idEtablissement))
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Typologie"
  const lienToAdd = "/responsable/addTypo"
  const lienDetail = "/responsable/typologie/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listTypologiesByIDEtab} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListTypologieResp
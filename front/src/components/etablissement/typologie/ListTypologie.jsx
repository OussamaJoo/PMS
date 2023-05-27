import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypologie } from '../../../redux/actions/typologieAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListTypologie = () => {
  const typologies = useSelector((state) => state.typologieReducer)
  const { listTypologies, error, loading } = typologies
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
    {
      Header: "Etablissement",
      accessor: "etablissement.nom"
    },

    
  ]

  useEffect(() => {
    dispatch(getTypologie())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Typologie"
  const lienToAdd = "/etablissement/addetypologie"
  const lienDetail = "/etablissement/typologie/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listTypologies} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }
      


    </div>


  )
}

export default ListTypologie
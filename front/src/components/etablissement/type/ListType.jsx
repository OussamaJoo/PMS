import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeEtab } from '../../../redux/actions/typeEtabAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListType = () => {
  const types = useSelector((state) => state.typeEtabReducer)
  const { listTypes, error, loading } = types
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
    
  ]

  useEffect(() => {
    dispatch(getTypeEtab())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Type Etablissement"
  const lienToAdd = "/etablissement/addtype"
  const lienDetail = "/etablissement/type/"

  return (
    <div className="content-wrapper">
      {loading ? <LoadingSpinner /> :
        <Table columns={columns} data={listTypes} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
      }


    </div>


  )
}

export default ListType
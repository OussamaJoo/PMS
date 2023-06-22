import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEtablissement } from '../../../redux/actions/etablissementAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListEtab = () => {
  const etabs = useSelector((state) => state.etablissementReducer)
  const { listEtablissement, error, loading } = etabs
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authReducer)
  const { user } = auth
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
      Header: "Adresse",
      accessor: "adresse"
    },
    {
      Header: "Type Etablissement",
      accessor: "typeEtablissement.nom"
    }
    
  ]

  useEffect(() => {
    dispatch(getEtablissement())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Etablissement"
  const lienToAdd = "/etablissement/addetab"
  const lienDetail = "/etablissement/etablissement/"

  return (

<div>
{user.roles[0] =="ROLE_ADMIN" ? (
      
 <div className="content-wrapper">
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listEtablissement} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />

}


</div>
    ) : (
      
 <div className="content-wrapper">
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listEtablissement} titre={titre} lienToAdd={null} lienDetail={null} />

}


</div>
    )}

</div>
    

  )
}

export default ListEtab
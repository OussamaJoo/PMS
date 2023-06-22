import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClient } from '../../../redux/actions/clientAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const ListClient = () => {
  const clients = useSelector((state) => state.clientReducer)
  const { listClient, error, loading } = clients
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
    }
    
  ]

  useEffect(() => {
    dispatch(getClient())
    return () => {
      dispatch(loadingComponent())
    }
  }, [dispatch])

  const titre = "Client"
  const lienToAdd = "/etablissement/addClient"
  const lienDetail = "/etablissement/client/"

  return (

<div>
{user.roles[0] =="ROLE_ADMIN" ? (
      
 <div className="content-wrapper">
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listClient} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />

}


</div>
    ) : (
      
 <div className="content-wrapper">
 {loading ? <LoadingSpinner /> :
   <Table columns={columns} data={listClient} titre={titre} lienToAdd={null} lienDetail={null} />

}


</div>
    )}

</div>
    

  )
}

export default ListClient
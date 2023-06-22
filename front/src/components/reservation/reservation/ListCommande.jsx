import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommande } from '../../../redux/actions/commandeAction'
import "../../globalComponenet/LoadingSpinner.css"
import LoadingSpinner from "../../globalComponenet/LoadingSpinner"
import Table from '../../globalComponenet/Table'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import dateFormat from 'dateformat';

const ListCommande = () => {
    const cmd = useSelector((state) => state.commandeReducer)

    const { listCommande, error, loading } = cmd
    const dispatch = useDispatch()


    const columns = [


        {
            Header: "Reférance",
            accessor: "id"
        },
        {
            Header: "Date CMD",
            accessor: "date",
            Cell: ({ value }) => { return dateFormat(value, "yyyy-mm-dd") }
        },
        
       
        {
            Header: "Etablissement",
            accessor: "reservations[0].etablissement.nom",
        },






    ]

    useEffect(() => {
        dispatch(getCommande())
        return () => {
            dispatch(loadingComponent())
        }
    }, [dispatch])

    const titre = "Commande"
    const lienToAdd = "/reservation/addCmd"
    const lienDetail = "/etablissement/reservation/"

    return (
        <div className="content-wrapper">
            {loading ? <LoadingSpinner /> :
                <Table columns={columns} data={listCommande} titre={titre} lienToAdd={lienToAdd} lienDetail={lienDetail} />
            }



        </div>


    )
}

export default ListCommande
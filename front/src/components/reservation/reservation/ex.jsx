import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCommandeById, removeSelectedCommande } from '../../../redux/actions/commandeAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'


import Moment from 'moment';

const DetailReservation = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idCmd } = useParams()



  const cmdReducer = useSelector((state) => state.commandeReducer)
  const { commande } = cmdReducer

  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer






  useEffect(() => {
    dispatch(getCommandeById(idCmd))

    return () => {
      dispatch(removeSelectedCommande())

    }
  }, [dispatch]);
  useEffect(() => {
    if (commande) {

     

    }
  }, [commande])

 



  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Commande/{commande?.id}</h5>
              <button className='btn bg-olive' >Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/reservation/commandes'}>Annuler</Link>
            </div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>
              <h1>{commande?.reservations[0]?.etablissement.nom}</h1>
              <hr></hr>
              <div className='row'>

                <div className='col-md-6 col-sm-6 col-6'>
                  <label>Date Debut : {commande?.reservations[0]?.dateDebut}</label>
                </div>
                <div className='col-md-6 col-sm-6 col-6'>
                  <label>Date Fin : {commande?.reservations[0]?.dateDebut}</label>



                </div>

                <table className='table align-middle  mb-0 bg-white   table-lg'>
                  <thead className='large'>
                    <tr>
                      <th>Nom</th>


                    </tr>
                  </thead>
                  <tbody>
                    {commande?.reservations?.map((ArtOrde, idx) => (
                      <tr className='samll' >
                        <td className='col-2'>
                          <h5>Reservation/{idx+1} {" Typologie : "+ArtOrde?.typologie?.nom}</h5>
                          <table className='table align-middle  mb-0 bg-white   table-sm'>
                            <thead className='small'>
                              <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>

                              </tr>
                            </thead>
                            <tbody>
                              {ArtOrde?.occupants?.map((menuItem, idx) => (
                                <tr className='samll' >
                                  <td className='col-2'>
                                    {menuItem.nom}


                                  </td>
                                  <td className='col-2'>
                                    {menuItem.prenom}
                                  </td>

                                  <td className='col-2'>
                                    {menuItem.email}
                                  </td>


                                </tr>))}

                            </tbody>
                          </table>

                        </td>



                      </tr>))}

                  </tbody>
                </table>


              </div>

            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailReservation
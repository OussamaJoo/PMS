import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCommandeById, removeSelectedCommande ,confirmationCommande} from '../../../redux/actions/commandeAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import {  loadingComponent } from '../../../redux/actions/loadingAction';


import moment from 'moment';

const DetailCommande = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idCmd } = useParams()



  const cmdReducer = useSelector((state) => state.commandeReducer)
  const { commande } = cmdReducer

  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer

  const [dateDeb, setdateDeb] = useState()
  const [dateFin, setdateFin] = useState()
  const [mealPlan, setmealPlan] = useState()


  const [verif ,setverif] = useState(true)




  useEffect(() => {
    dispatch(getCommandeById(idCmd))

    return () => {
      dispatch(removeSelectedCommande())

    }
  }, [dispatch]);
  useEffect(() => {
    if (commande) {


      commande?.reservations?.map(f => {
        if(f?.typologie?.annulable === false){
         return setverif(false)
        }
      })




    }
  }, [commande])


  const AnnulerCommande = (e) => {
    e.preventDefault()
    dispatch(confirmationCommande(idCmd,navigate))
   
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getCommandeById(idCmd))
      dispatch(removeSelectedCommande())
    }, 1000);
   
}

  


  
  const ButtonAnnulation = () => {
    let button;

    if (verif == true&&commande.etat === 'Confirmé') {
        button =
            <button className='btn bg-red' onClick={(e) => AnnulerCommande(e)}>Annuler la Commande</button>
    }

    return button;
}





  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Commande/{commande?.id}</h5>
              
             
              <>
              {ButtonAnnulation()}
              <Link className='ml-1 btn bg-white' to={'/client/commandes'}>Retour</Link>
              </>
            </div>

            <div class="mt-5 mr-2 ribbon-wrapper ribbon-lg">
  <div class={commande.etat=="Confirmé" ? 'mt-3 ribbon bg-success text-lg' :'mt-3 ribbon bg-red  text-lg'}>
   <small>{commande.etat}</small> 
  </div>
  
</div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>

              <div className='row'>

                {commande?.reservations?.map((ArtOrde, idx) => (
                  <div className='col-md-12 col-sm-12 col-12'>
                    <h3>Reservation/{idx + 1} {" Typologie : " +ArtOrde?.qte+' '+ ArtOrde?.typologie?.nom}</h3>
                    <div className='row'>
                      <div className='col-6'>
                        <label>Capacité : {ArtOrde?.typologie?.capacite} </label>
                      </div>
                      <div className='col-6'>
                        <label>Meal Plan : {ArtOrde?.mealPlan?.nom}</label>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>
                        <label>Date Debut : {ArtOrde?.dateDebut}</label>
                      </div>
                      <div className='col-6'>
                        <label>Data Fin : {ArtOrde?.dateFin}</label>
                      </div>
                    </div>
                    <h5>Occupant(s) : </h5>
                    <table className='table align-middle  mb-0 bg-white   table-sm'>
                      <thead className='small'>
                        <tr>
                          <th>CIN</th>
                          <th>Nom</th>
                          <th>Prenom</th>
                          <th>Email</th>
                          <th>Telephone</th>

                        </tr>
                      </thead>
                      <tbody>
                        {ArtOrde?.occupants?.map((menuItem, idx) => (
                          <tr className='samll' >
                            <td className='col-2'>
                              {menuItem.cin}


                            </td>
                            <td className='col-2'>
                              {menuItem.nom}


                            </td>
                            <td className='col-2'>
                              {menuItem.prenom}
                            </td>

                            <td className='col-2'>
                              {menuItem.email}
                            </td>

                            <td className='col-2'>
                              {menuItem.tel}
                            </td>




                          </tr>))}

                      </tbody>
                    </table>
                    <hr></hr>
                    <hr></hr>
                  </div>
                ))}



              </div>

            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailCommande
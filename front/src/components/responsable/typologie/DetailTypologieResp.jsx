import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTypologieById, removeSelectedTypologie, updateTypologie } from '../../../redux/actions/typologieAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'
import ToggleButton from 'react-toggle-button'

const DetailTypologieResp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idTypologie } = useParams()

  const authReducer = useSelector((state) => state.authReducer)
  const { user1 } = authReducer


  const typologieReducer = useSelector((state) => state.typologieReducer)
  const { typologie } = typologieReducer
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [typologieUpdate, settypologieUpdate] = useState({
    nom: '',
    categorie: '',
    capacite: '',
    etablissement: '',
    acceptEnfant: '',
    accecptBebe: '',
    acceptHandicapé: '',
    annulable: '',
    remborsable: ''

  })


  useEffect(() => {
    dispatch(getTypologieById(idTypologie))

    return () => {
      dispatch(removeSelectedTypologie())
    }
  }, [dispatch]);
  useEffect(() => {
    if (typologie) {
      settypologieUpdate({...TypologieUpdate, nom : typologie.nom , capacite : typologie.capacite , acceptEnfant: typologie.acceptEnfant,
        accecptBebe:typologie.accecptBebe,acceptHandicapé:typologie.acceptHandicapé,annulable:typologie.annulable,
        remborsable:typologie.remborsable,etablissement:'/api/etablissements/'+user1.idEtablissement})

    }
  }, [typologie])

  const TypologieUpdate = e => {
    e.preventDefault()
    dispatch(updateTypologie(typologieUpdate, idTypologie, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getTypologieById(idTypologie))
    }, 100);
  }



  const onChangeValue = (e) => {
    settypologieUpdate(
      {
        ...typologieUpdate,
        [e.target.name]: e.target.value,
      }
    )
  }

  const onChangeValue1 = (e) => {
    settypologieUpdate(
      {
        ...typologieUpdate,
        [e.target.name]: parseInt(e.target.value),
      }
    )
  }

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Typologie/{typologie.id}</h5>
              <button className='btn bg-olive' onClick={(e) => TypologieUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/responsable/typologies'}>Annuler</Link>
            </div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>
              <div className='row'>
              <div className='col-md-10 col-sm-10 col-10'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Etablissement </label>
                        <h5>{typologie?.etablissement?.nom}</h5>

                  </div>
                </div>
                <div className='col-md-6 col-sm-6 col-6'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Nom </label>

                    <input type="text" className="form-control form-control-border" placeholder="Ecrire Ici"
                      name='nom' value={typologieUpdate.nom} onChange={onChangeValue} />
                  </div>
                </div>

                

                <div className='col-md-4 col-sm-4 col-4'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Capacité </label>

                    <input type="number" className="form-control form-control-border" placeholder="Ecrire Ici"
                      name='capacite' value={typologieUpdate.capacite} onChange={onChangeValue1} />
                  </div>
                </div>



                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Accept enfant </label>
                  </div>
                </div>
                <div className='col-md-2 col-sm-2 col-2'>
                  <ToggleButton
                    inactiveLabel={'no'}
                    activeLabel={'yes'}
                    value={typologieUpdate.acceptEnfant || false} 

                    onToggle={(value) => {
                      settypologieUpdate({
                        ...typologieUpdate,
                        acceptEnfant: !value,
                      })
                    }} />


                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Accept bebe </label>
                  </div>
                </div>
                <div className='col-md-2 col-sm-2 col-2'>
                  <ToggleButton
                    inactiveLabel={'no'}
                    activeLabel={'yes'}
                    value={typologieUpdate.accecptBebe || false}

                    onToggle={(value) => {
                      settypologieUpdate({
                        ...TypologieUpdate,
                        accecptBebe: !value,
                      })
                    }} />

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Accept handicapé </label>
                  </div>
                </div>
                <div className='col-md-2 col-sm-2 col-2'>
                  <ToggleButton
                    inactiveLabel={'no'}
                    activeLabel={'yes'}
                    value={typologieUpdate.acceptHandicapé || false}

                    onToggle={(value) => {
                      settypologieUpdate({
                        ...typologieUpdate,
                        acceptHandicapé: !value,
                      })
                    }} />

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Annulable</label>
                  </div>
                </div>
                <div className='col-md-2 col-sm-2 col-2'>
                  <ToggleButton
                    inactiveLabel={'no'}
                    activeLabel={'yes'}
                    value={typologieUpdate.annulable || false}

                    onToggle={(value) => {
                      settypologieUpdate({
                        ...typologieUpdate,
                        annulable: !value,
                      })
                    }} />

                </div>

                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Remborsable</label>
                  </div>
                </div>
                <div className='col-md-2 col-sm-2 col-2'>
                  <ToggleButton
                    inactiveLabel={'no'}
                    activeLabel={'yes'}
                    value={typologieUpdate.remborsable || false}

                    onToggle={(value) => {
                      settypologieUpdate({
                        ...typologieUpdate,
                        remborsable: !value,
                      })
                    }} />

                </div>
                

              </div>


            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailTypologieResp
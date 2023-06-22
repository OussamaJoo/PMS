import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTypeEtabById, removeSelectedTypeEtab, updateTypeEtab } from '../../../redux/actions/typeEtabAction'
import LoadingSpinner from '../../globalComponenet/LoadingSpinner'
import { loadingComponent } from '../../../redux/actions/loadingAction'

const DetailType = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { idType } = useParams()

  const typeEtabReducer = useSelector((state) => state.typeEtabReducer)
  const { typeEtab } = typeEtabReducer
  const etabs = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabs
  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer
  const [typeUpdate, settypeUpdate] = useState({
    nom: '',

  })


  useEffect(() => {
    dispatch(getTypeEtabById(idType))

    return () => {
      dispatch(removeSelectedTypeEtab())
    }
  }, [dispatch]);
  useEffect(() => {
    if (typeEtab) {
      settypeUpdate(typeEtab)

    }
  }, [typeEtab])

  const TypeUpdate = e => {
    e.preventDefault()
    dispatch(updateTypeEtab(typeUpdate, idType, navigate))
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getTypeEtabById(idType))
    }, 100);
  }



  const onChangeValue = (e) => {
    settypeUpdate(
      {
        ...typeUpdate,
        [e.target.name]: e.target.value,
      }
    )
  }

  return (

    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">

              <h5>Type/{typeEtab.id}</h5>
              <button className='btn bg-olive' onClick={(e) => TypeUpdate(e)}>Sauvegarder</button>
              <Link className='ml-1 btn bg-white' to={'/etablissement/types'}>Annuler</Link>
            </div>

          </div>
        </div>
      </section>
      <div className="card container">


        <div className="card-body">
          {loading ? <LoadingSpinner /> :
            <form>

              <div className='row'>
                <div className='col-md-8 col-sm-8 col-8'>
                  <div className="form-group">
                    <label htmlFor="exampleInputBorder">Nom</label>
                    <input type="text" className="form-control form-control-border" placeholder="Nom"
                      name='nom' value={typeUpdate.nom || ""} onChange={onChangeValue} />
                  </div>


                  <h5>Liste des {typeUpdate.nom}s</h5>
                
                  <div className="tab-pane fade show active" id="custom-content-below-test" role="tabpanel" aria-labelledby="custom-content-below-test-tab">
                    <table className='table align-middle  mb-0 bg-white   table-sm'>
                      <thead className='small'>
                        <tr>
                          <th>Nom</th>
                          <th>Description</th>

                        </tr>
                      </thead>
                      <tbody>
                        
                        {listEtablissement.filter(j =>  typeUpdate.id == j.typeEtablissement.id)?.map((ArtOrde, idx) => (
                          <tr className='samll' >
                            <td className='col-2'>
                              {ArtOrde.nom}
                            </td>
                            <td>
                              {ArtOrde.description}
                            </td>


                          </tr>))}

                      </tbody>
                    </table>
                  </div>

                </div>


              </div>

            </form>
          }
        </div>
      </div>

    </div>
  )
}

export default DetailType
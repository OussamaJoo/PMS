import React, { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getReservationById, getReservationById2,
  confirmationReservation, removeSelectedReservation,
  createFacture,
  updateReservation,
  uploadPdfFacture
} from '../../../redux/actions/reservationAction'
import dateFormat from 'dateformat';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { DateTimePickerComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getOccupant, saveOccupant } from '../../../redux/actions/occupantAction'
import { getTypologie } from '../../../redux/actions/typologieAction';
import { getEtablissement } from '../../../redux/actions/etablissementAction';
import { getMealPlan } from '../../../redux/actions/mealPlanAction';
import LoadingSpinner from '../../globalComponenet/LoadingSpinner';
import { ComponentIsLoaded, loadingComponent } from '../../../redux/actions/loadingAction';
import Pdf from 'react-to-pdf'
import InstanceAxios from '../../../InstanceAxios';
import { toast } from 'react-toastify';







const DetailReservation = () => {
  const ref = React.createRef()
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [updateComponenet, setupdateComponenet] = useState(false)

  const loadingReducer = useSelector((state) => state.loadingReducer)
  const { loading } = loadingReducer

  const reservationReducer = useSelector((state) => state.reservationReducer)
  const { reservation } = reservationReducer
  const reservationReducer2 = useSelector((state) => state.reservationReducer)
  const { reservation2 } = reservationReducer2
  const { idRes } = useParams()

  const occu = useSelector((state) => state.occupantReducer)
  const { listOccupant } = occu

  // get list of artices
  const etabs = useSelector((state) => state.etablissementReducer)
  const { listEtablissement } = etabs

  // get list of emplacements
  const typo = useSelector((state) => state.typologieReducer)
  const { listTypologies } = typo

  const Mp = useSelector((state) => state.mealPlanReducer)
  const { listMealPlan } = Mp

  const [mail, setmail] = useState({
    to: '',
    body: "",
    subject: "Demande d'achat",
    path: ""
  })

  useEffect(() => {
    dispatch(getReservationById(idRes))
    dispatch(getReservationById2(idRes))
    dispatch(getEtablissement())
    dispatch(getTypologie())
    dispatch(getMealPlan())
    dispatch(getOccupant())
    return () => {

      dispatch(removeSelectedReservation())

    }
  }, [dispatch])




  const [demandeAchatUpdate, setdemandeAchatUpdate] = useState({


    Occupants: [
      {


      }
    ],
    idOccupant: [],
    dateDebut: '',
    dateFin: '',
    etablissement: '',
    typologie: '',
    mealPlan: '',
    nomEtab: '',
    nomTypo: ''


  })











  const AddligneCommandes = () => {
    setdemandeAchatUpdate({
      ...demandeAchatUpdate, Occupants: demandeAchatUpdate.Occupants.concat([
        {


        }]), idOccupant: demandeAchatUpdate.idOccupant.concat([

        ])
    })
  };

  const RemoveligneCommandes = idx => () => {
    setdemandeAchatUpdate({
      ...demandeAchatUpdate, Occupants: demandeAchatUpdate.Occupants.filter((s, sidx) => idx !== sidx), idOccupant: demandeAchatUpdate.idOccupant.filter((s, sidx) => idx !== sidx)
    })
  };



  // save occupant if not found
  const [occupant, setoccupant] = useState({

    nom: '',
    prenom: '',
    cin: '',
    tel: '',
    dateNaissance: '',
    email: ''


  });


  const savearticle = e => {
    e.preventDefault()
    dispatch(saveOccupant(occupant))
    setTimeout(() => {
      dispatch(getOccupant())
      console.log(listOccupant)

    });



    console.log(listOccupant)
    handleClose()

  }



  const [open, toggleOpen] = useState(false);   // open dialog or modal

  const handleClose = () => {   // close the dialog
    setoccupant({

      nom: '',
      prenom: '',
      cin: '',
      tel: '',
      dateNaissance: '',
      email: ''


    });
    toggleOpen(false);
  };




  const [image, setimage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [extension, setextension] = useState('')


  const handleUploadClick = (e) => {
    let file = e.target.files[2]
    const image = new FormData()
    image.append('pdfFile', file)
    setimage(image)
    console.log(e.target.files[0])
    setImagePreview(URL.createObjectURL(file))

  }

  const creerFacture = (e) => {
    e.preventDefault()
    dispatch(createFacture(idRes, navigate))
    image.append('name', reservation.reference?.replaceAll('/', '_'));
    dispatch(uploadPdfFacture(image));
    dispatch(removeSelectedReservation())
    dispatch(loadingComponent())
    setTimeout(() => {
      dispatch(getReservationById(idRes))
    }, 100);

  }









  //   update demande d'achat 
  const changeToUpdate = (e) => {
    e.preventDefault()
    setupdateComponenet(true)

    setdemandeAchatUpdate({

      dateDebut: reservation.dateDebut,
      dateFin: reservation.dateFin,
      etablissement: reservation2.etablissement,
      typologie: reservation2.typologie,
      mealPlan: reservation2.mealPlan,
      nomEtab: reservation?.etablissement?.nom,
      nomTypo: reservation?.typologie?.nom,
      etab: reservation?.etablissement?.id,
      Occupants: reservation.Occupants,

      idOccupant: reservation2?.idOccupant



    })
  }

  const DemandeAchatUpdate = e => {
    e.preventDefault()
    dispatch(updateReservation(idRes, demandeAchatUpdate, navigate))
    dispatch(loadingComponent())
    //image.append('name', article.reference);
    //dispatch(uploadImage(image));
    //navigate('/stock/articles')
    setupdateComponenet(false)
    setTimeout(() => {

      dispatch(dispatch(getReservationById(idRes)))
      dispatch(dispatch(getReservationById2(idRes)))
    }, 100);

    /*dispatch(loadingComponent()) 
    dispatch(removeSelectedArticle())
    dispatch(getArticleById(idArticle))*/
    //dispatch(loadingComponent())

  }

  return (
    <>

      <div className="content-wrapper">
        {loading ? <LoadingSpinner /> :
          <>
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h5>Reservation/{reservation.id}</h5>
                    {!updateComponenet &&
                      <>
                        <button className="btn bg-olive btn-sm" onClick={changeToUpdate}>Modifier</button>

                      </>
                    }
                    {updateComponenet && <>
                      <button className='btn bg-olive  btn-sm' onClick={e => DemandeAchatUpdate(e)}>Sauvgarder</button>
                      <button className='btn bg-olive  btn-sm' onClick={e => setupdateComponenet(false)}>Annuler</button>
                    </>
                    }
                    <Pdf paperSize={'A3'} targetRef={ref} filename={`ReservatinN°${reservation.id}.pdf`} >
                      {({ toPdf }) => <button onClick={toPdf} className='btn btn-light ' data-toggle="modal" data-target="#exampleModal"><b>Envoyer par mail</b></button>}
                    </Pdf>


                    <Link className='ml-1 btn bg-white ' to={'/etablissement/reservations'}>Annuler</Link>


                  </div>

                  <div class="mt-5 mr-2 ribbon-wrapper ribbon-lg">
                    <div class={reservation2.etat == "Confirmée" ? 'mt-3 ribbon bg-success text-lg' : 'mt-3 ribbon bg-warning  text-lg'}>
                      <small>{reservation2.etat}</small>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <div className="card container" ref={ref}>
              {updateComponenet &&
                <div className="card-body">


                  <form>

                    <h5 >
                      <b>{reservation.id}</b>
                    </h5>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-3'>
                            <small>Etablissement</small>
                          </div>
                          <div className='col-8'>
                            <Autocomplete

                              PaperProps={{
                                style: {

                                  width: '50px'
                                },
                              }}
                              value={demandeAchatUpdate.nomEtab}
                              onChange={(evt, newValue) => {


                                setdemandeAchatUpdate({ ...demandeAchatUpdate, nomEtab: newValue?.nom, etablissement: '/api/etablissements/' + newValue?.id, etab: newValue?.id })



                              }}
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);




                                return filtered;
                              }}
                              id="free-solo-dialog-demo"
                              options={listEtablissement}
                              getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                  return option || '';
                                }
                                if (option.inputValue) {
                                  return option.nom;
                                }
                                return option.nom;
                              }}
                              selectOnFocus
                              clearOnBlur
                              handleHomeEndKeys
                              renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                              sx={{ width: 300 }}
                              freeSolo
                              renderInput={(params) => <TextField placeholder="Enter Etablissement" variant="standard" size="small" {...params} />}
                            />
                          </div>
                          <div className='col-3 '>
                            <small>Typologie</small>
                          </div>
                          <div className='col-8'>


                            <Autocomplete

                              PaperProps={{
                                style: {

                                  width: '50px'
                                },
                              }}
                              value={demandeAchatUpdate.nomTypo}
                              onChange={(evt, newValue) => {


                                setdemandeAchatUpdate({ ...demandeAchatUpdate, nomTypo: newValue?.nom, typologie: '/api/typologies/' + newValue?.id })



                              }}
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);




                                return filtered;
                              }}
                              id="free-solo-dialog-demo"
                              options={listTypologies.filter(p => p.etablissement?.id === demandeAchatUpdate.etab)}
                              getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                  return option || '';
                                }
                                if (option.inputValue) {
                                  return option.nom;
                                }
                                return option.nom;
                              }}
                              selectOnFocus
                              clearOnBlur
                              handleHomeEndKeys
                              renderOption={(props, option) => <li {...props}>{option.nom}</li>}
                              sx={{ width: 300 }}
                              freeSolo
                              renderInput={(params) => <TextField placeholder="Enter Typologie" variant="standard" size="small" {...params} />}
                            />


                          </div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-3'>
                            <small>Date de debut</small>
                          </div>
                          <div className='col-8'>

                            <DateTimePickerComponent value={demandeAchatUpdate?.dateDebut} onChange={e => setdemandeAchatUpdate({ ...demandeAchatUpdate, dateDebut: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                            {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
                          </div>
                          <div className='col-3'>
                            <small>Date fin</small>
                          </div>
                          <div className='col-8'>

                            <DateTimePickerComponent value={demandeAchatUpdate?.dateFin} onChange={e => setdemandeAchatUpdate({ ...demandeAchatUpdate, dateFin: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>

                          </div>

                          <div className='col-3'>
                            <small>Meal Plan</small>
                          </div>
                          <div className='col-8'>
                            <select className="form-control border-dark form-control-border form-control-sm"
                              value={demandeAchatUpdate?.mealPlan}
                              onChange={(e) => { setdemandeAchatUpdate({ ...demandeAchatUpdate, mealPlan: '/api/meal_plans/' + e.target.value }) }}>

                              {
                                listMealPlan.map(f =>

                                  <option key={f.id} value={f.id} selected={demandeAchatUpdate?.mealPlan == '/api/meal_plans/' + f.id}>{f.nom}</option>
                                )}
                            </select>


                          </div>
                        </div>

                      </div>

                    </div>
                    <div className="card-body">

                      <ul className="nav nav-tabs small" id="custom-content-below-tab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="custom-content-below-test-tab" data-toggle="pill" href="#custom-content-below-test" role="tab" aria-controls="custom-content-below-test" aria-selected="false">Occupant(s)</a>
                        </li>


                      </ul>
                      <div className="tab-content mt-4" id="custom-content-below-tabContent">


                        <div className="tab-pane fade show active" id="custom-content-below-test" role="tabpanel" aria-labelledby="custom-content-below-test-tab">
                          <table className='table align-middle  mb-0 bg-white   table-sm'>
                            <thead className='small'>
                              <tr>
                                <th>Cin</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                                <th>Tel</th>
                              </tr>
                            </thead>
                            <tbody>
                              {demandeAchatUpdate.Occupants?.map((ArtOrde, idx) => (
                                <tr className='samll' >
                                  <td className='col-2'>
                                    <Autocomplete
                                      PaperProps={{
                                        style: {

                                          width: '20px'
                                        },
                                      }}
                                      value={ArtOrde?.cin}
                                      onChange={(evt, newValue) => {
                                        if (typeof newValue === 'string') {
                                          // timeout to avoid instant validation of the dialog's form.
                                          setTimeout(() => {
                                            toggleOpen(true);
                                            setoccupant({

                                              nom: '',
                                              prenom: '',
                                              cin: newValue,
                                              tel: '',
                                              dateNaissance: '',
                                              email: ''

                                            });
                                            const newOrderMenuItem = demandeAchatUpdate.Occupants.map((ordArt, sidx) => {
                                              if (idx !== sidx) return ordArt;
                                              return { ...ordArt, id: evt.target.value };
                                            });

                                            setdemandeAchatUpdate({ ...demandeAchatUpdate, Occupants: newOrderMenuItem });
                                          });
                                          console.log("if")
                                        } else if (newValue && newValue.inputValue) {

                                          toggleOpen(true);
                                          setoccupant({

                                            nom: occupant?.nom,
                                            prenom: '',
                                            cin: newValue.inputValue,
                                            tel: '',
                                            dateNaissance: '',
                                            email: ''

                                          });
                                          const newOrderMenuItem = demandeAchatUpdate.Occupants.map((ordArt, sidx) => {
                                            if (idx !== sidx) return ordArt;
                                            return { ...ordArt, id: newValue?.id, email: newValue?.email, tel: newValue?.tel, nom: newValue?.nom, prenom: newValue?.prenom, occupant: { email: newValue?.email, tel: newValue?.tel, cin: newValue?.cin, nom: newValue?.nom, prenom: newValue?.prenom } };
                                          });


                                          setdemandeAchatUpdate({ ...demandeAchatUpdate, Occupants: newOrderMenuItem });
                                          console.log("tw" + newValue.inputValue)
                                          console.log("else if")
                                        } else {

                                          setoccupant(newValue);
                                          console.log("else ")
                                          const newOrderMenuItem = demandeAchatUpdate.Occupants.map((ordArt, sidx) => {
                                            console.log("sdix " + sidx)
                                            if (idx !== sidx) return ordArt;
                                            return { ...ordArt, id: newValue?.id, email: newValue?.email, cin: newValue?.cin, dateNaissance: newValue?.dateNaissance, tel: newValue?.tel, nom: newValue?.nom, prenom: newValue?.prenom, occupant: { email: newValue?.email, tel: newValue?.tel, cin: newValue?.cin, nom: newValue?.nom, prenom: newValue?.prenom } };
                                          });

                                          console.log("idx " + idx)
                                          console.log(newValue)

                                          if (newValue !== null) {
                                            setdemandeAchatUpdate({ ...demandeAchatUpdate, Occupants: newOrderMenuItem, idOccupant: demandeAchatUpdate.idOccupant.concat('/api/occupants/' + newValue?.id) });
                                          } else {
                                            setdemandeAchatUpdate({ ...demandeAchatUpdate, Occupants: newOrderMenuItem, idOccupant: demandeAchatUpdate.idOccupant.filter((s, sidx) => idx !== sidx) });
                                          }


                                        }
                                      }}
                                      filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        if (params.inputValue !== '') {
                                          filtered.push({
                                            inputValue: params.inputValue,
                                            cin: `Add "${params.inputValue}"`,
                                          });

                                        }

                                        return filtered;
                                      }}
                                      id="free-solo-dialog-demo"
                                      options={listOccupant}
                                      getOptionLabel={(option) => {
                                        // e.g value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                          return option;
                                        }
                                        if (option.inputValue) {
                                          return option.inputValue;
                                        }
                                        return option.cin;
                                      }}
                                      selectOnFocus
                                      clearOnBlur
                                      handleHomeEndKeys
                                      renderOption={(props, option) => <li {...props}>{option.cin}</li>}
                                      sx={{ width: 150 }}
                                      freeSolo
                                      renderInput={(params) => <TextField placeholder="Enter occupant" variant="standard" size="small" {...params} />}
                                    />
                                  </td>
                                  <td>
                                    {ArtOrde.nom}
                                  </td>
                                  <td>
                                    {ArtOrde.prenom}
                                  </td>
                                  <td>
                                    {ArtOrde.email}

                                  </td>
                                  <td>
                                    {ArtOrde.tel}
                                  </td>
                                  <td>
                                    <button type="button" onClick={RemoveligneCommandes(idx)} className="small">-</button>
                                  </td>
                                </tr>))}
                              <tr>
                                <small onClick={AddligneCommandes} className="small ">Ajouter un article</small>
                              </tr>

                            </tbody>
                          </table>
                        </div>


                      </div>
                    </div>
                  </form>


                </div>}



              {!updateComponenet &&
                <div className="card-body">

                  <form>


                    <div className='row'>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-3'>
                            <small>Etablissement</small>
                          </div>
                          <div className='col-8'>
                            <label className="  border-0 ">
                              {reservation.etablissement?.nom}
                            </label>
                          </div>
                          <div className='col-3 '>
                            <small>Typologiie</small>
                          </div>
                          <div className='col-8'>

                            <label className="  border-0 ">
                              {reservation.typologie?.nom}
                            </label>

                          </div>
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className='row'>
                          <div className='col-4'>
                            <small>Date de debut</small>
                          </div>
                          <div className='col-7'>

                            <DateTimePickerComponent value={reservation?.dateDebut} onChange={e => setdemandeAchatUpdate({ ...demandeAchatUpdate, dateDebut: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                            {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
                          </div>
                          <div className='col-4'>
                            <small>Date fin</small>
                          </div>
                          <div className='col-7'>

                            <DateTimePickerComponent value={reservation?.dateFin} onChange={e => setdemandeAchatUpdate({ ...demandeAchatUpdate, dateFin: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>

                          </div>

                          <div className='col-4'>
                            <small>Meal Plan</small>
                          </div>
                          <div className='col-7'>


                            <label className="  border-0 ">
                              {reservation.mealPlan?.nom}
                            </label>
                          </div>
                        </div>

                      </div>

                    </div>
                    <div className="card-body">

                      <ul className="nav nav-tabs small" id="custom-content-below-tab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link active" id="custom-content-below-test-tab" data-toggle="pill" href="#custom-content-below-test" role="tab" aria-controls="custom-content-below-test" aria-selected="false">Occupant(s)</a>
                        </li>


                      </ul>
                      <div className="tab-content mt-4" id="custom-content-below-tabContent">


                        <div className="tab-pane fade show active" id="custom-content-below-test" role="tabpanel" aria-labelledby="custom-content-below-test-tab">
                          <table className='table align-middle  mb-0 bg-white   table-sm'>
                            <thead className='small'>
                              <tr>
                                <th>Cin</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                                <th>Tel</th>
                              </tr>
                            </thead>
                            <tbody>
                              {reservation.Occupants?.map((ArtOrde, idx) => (
                                <tr className='samll' >
                                  <td className='col-2'>
                                    {ArtOrde?.cin}
                                  </td>
                                  <td>
                                    {ArtOrde?.nom}
                                  </td>
                                  <td>
                                    {ArtOrde?.prenom}
                                  </td>
                                  <td>
                                    {ArtOrde?.email}

                                  </td>
                                  <td>
                                    {ArtOrde?.tel}

                                  </td>

                                </tr>))}

                            </tbody>
                          </table>
                        </div>

                      </div>
                    </div>
                  </form>


                </div>}
            </div></>}


        <div class="modal fade" id="factureModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Créer une facture
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                La facture sera créée en tant que brouillon de manière à ce que vous puissiez les passer en revue avant validation.

                <form>

                  <input type="file" className='form-control' onChange={handleUploadClick} />

                </form>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={(e) => creerFacture(e)}>Créer la facture</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DetailReservation
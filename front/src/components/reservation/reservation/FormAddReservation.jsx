import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { saveReservation } from '../../../redux/actions/reservationAction'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getOccupant, saveOccupant } from '../../../redux/actions/occupantAction'
import { getTypologie } from '../../../redux/actions/typologieAction';
import { getEtablissement } from '../../../redux/actions/etablissementAction';
import { getMealPlan } from '../../../redux/actions/mealPlanAction';




  


const FormAddReservation = () => {
  const filter = createFilterOptions();
  const dispatch = useDispatch()
  const navigate = useNavigate()


  //
  const authReducer = useSelector((state) => state.authReducer)
  const { user } = authReducer

 
  
  //      get list of fournisseurs
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

  useEffect(() => {
    dispatch(getEtablissement())
    dispatch(getOccupant())
    dispatch(getTypologie())
    dispatch(getMealPlan())
  }, [dispatch])


  // save demander d'achat 
  const [commande, setcommande] = useState({


    lignesCommande: [
      {
        idMenuItem: '',
        occupant: { email: '', tel: '', cin: '', nom: '', prenom: '' }

      }
    ],
    idOccupant: [],
    dateDebut: '',
    dateFin: '',
    etablissement: '',
    typologie: '',
    mealPlan: '',
    nomEtab: '',
    nomTypo: '',
    etat : 'En Attente'


  })

  const savecommande = (e) => {
    e.preventDefault()

    dispatch(saveReservation(commande, navigate))



  }



  const AddligneCommandes = () => {
    setcommande({
      ...commande, lignesCommande: commande.lignesCommande.concat([
        {
          idMenuItem: '',

        }]) , idOccupant : commande.idOccupant.concat([
          
        ])
    })
  };

  const RemoveligneCommandes = idx => () => {
    setcommande({
      ...commande, lignesCommande: commande.lignesCommande.filter((s, sidx) => idx !== sidx),idOccupant : commande.idOccupant.filter((s, sidx) => idx !== sidx)
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

  const saveoccupant = e => {
    e.preventDefault()
    dispatch(saveOccupant(occupant))
    setoccupant(occupant)
    setTimeout(() => {
      dispatch(getOccupant())
      setoccupant(occupant)
      console.log(listOccupant)

    }, 1000);



    console.log(listOccupant)
    handleClose()

  }

  const onChangeValue = (e) => {
    setoccupant(
      {
        ...occupant,
        [e.target.name]: e.target.value,
      }
    )
  }
  const handleCheckBox = (e) => {
    setoccupant(
      {
        ...occupant,
        [e.target.name]: e.target.checked,
      }
    )
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





  const handleSubmit = (event) => {
    event.preventDefault();
    setoccupant({
      id: occupant?.id,
      nom: '',
      prixUT: '',
      Image: '',
      idcategorie: '',
      description: '',
      etab:''


    });

    handleClose();
  };














  return (
    <>

      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h5>Reservation/Nouveau</h5>
                <button className='btn bg-olive' onClick={(e) => savecommande(e)}>Sauvegarder</button>
                <Link className='ml-1 btn bg-white' to={'/etablissement/reservations'}>Annuler</Link>
              </div>

            </div>
          </div>
        </section>

        <div className="card container">

          <div className="card-body">

            <form>

              <div className='row'>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-3'>
                      <small><b>Etablissement</b></small>
                    </div>
                    <div className='col-8'>
                      <Autocomplete

                        PaperProps={{
                          style: {

                            width: '50px'
                          },
                        }}
                        value={commande.nomEtab}
                        onChange={(evt, newValue) => {


                          setcommande({ ...commande, nomEtab: newValue?.nom, etablissement: '/api/etablissements/' + newValue?.id , etab : newValue?.id })



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

                    <div className='col-3'>
                      <small><b>Typologie</b></small>
                    </div>
                    <div className='col-8'>

                      <Autocomplete

                        PaperProps={{
                          style: {

                            width: '50px'
                          },
                        }}
                        value={commande.nomTypo}
                        onChange={(evt, newValue) => {


                          setcommande({ ...commande, nomTypo: newValue?.nom, typologie: '/api/typologies/'+newValue?.id })



                        }}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);




                          return filtered;
                        }}
                        id="free-solo-dialog-demo"
                        options={listTypologies.filter(p => p.etablissement?.id === commande.etab)}
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
                    <div className='col-3'>
                      <small><b>Meal Plan</b></small>
                    </div>
                    <div className='col-8'>
                      <select className="form-control border-dark form-control-border form-control-sm"
                        value={commande.tables?.id}
                        onChange={(e) => { setcommande({ ...commande, mealPlan: '/api/meal_plans/'+ e.target.value  }) }}>
                        <option selected>Select MealPlan</option>
                        {
                          listMealPlan.map(f =>
                            <option key={f.id} value={f.id}>{f.nom}</option>
                          )}
                      </select>


                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='row'>
                    <div className='col-3'>
                      <small><b>Date debut</b></small>
                    </div>
                    <div className='col-8'>

                      <DateTimePickerComponent value={commande?.dateDebut} onChange={e => setcommande({ ...commande, dateDebut: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                      {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
                    </div>
                    <div className='col-3'>
                      <small><b>Date fin</b></small>
                    </div>
                    <div className='col-8'>

                      <DateTimePickerComponent value={commande?.dateFin} onChange={e => setcommande({ ...commande, dateFin: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                      {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
                    </div>
                    {/* 
                    <div className='col-3'>
                      <small><b>Date de réception</b></small>
                    </div>
                    <div className='col-8'>

                      <DatePickerComponent placeholder='Choose a date and time'></DatePickerComponent>

                    </div>*/}

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
                          <th>Email </th>
                          <th>Tel </th>
                        </tr>
                      </thead>
                      <tbody>
                        {commande.lignesCommande.map((ArtOrde, idx) => (
                          <tr className='samll' >
                            <td className='col-2'>
                              <Autocomplete
                                PaperProps={{
                                  style: {

                                    width: '20px'
                                  },
                                }}
                                value={ArtOrde.lignesCommande?.cin}
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
                                      const newOrderMenuItem = commande.lignesCommande.map((ordArt, sidx) => {
                                        if (idx !== sidx) return ordArt;
                                        return { ...ordArt, idMenuItem: evt.target.value };
                                      });

                                      setcommande({ ...commande, lignesCommande: newOrderMenuItem });
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
                                    const newOrderMenuItem = commande.lignesCommande.map((ordArt, sidx) => {
                                      if (idx !== sidx) return ordArt;
                                      return { ...ordArt, idMenuItem: newValue?.id, email: newValue?.email, tel: newValue?.tel, nom: newValue?.nom, prenom: newValue?.prenom, occupant: { email: newValue?.email, tel: newValue?.tel, cin: newValue?.cin, nom: newValue?.nom, prenom: newValue?.prenom } };
                                    });


                                    setcommande({ ...commande, lignesCommande: newOrderMenuItem });
                                    console.log("tw" + newValue.inputValue)
                                    console.log("else if")
                                  } else {
                                    
                                    setoccupant(newValue);
                                    console.log("else ")
                                    const newOrderMenuItem = commande.lignesCommande.map((ordArt, sidx) => {
                                      console.log("sdix " + sidx)
                                      if (idx !== sidx) return ordArt;
                                      return { ...ordArt, idMenuItem: newValue?.id, email: newValue?.email, cin: newValue?.cin, tel: newValue?.tel, nom: newValue?.nom, prenom: newValue?.prenom, occupant: { email: newValue?.email, tel: newValue?.tel, cin: newValue?.cin, nom: newValue?.nom, prenom: newValue?.prenom } };
                                    });
                                  
                                    console.log("idx " + idx)
                                    console.log(newValue)
                                  
                                    if(newValue !== null){
                                      setcommande({ ...commande, lignesCommande: newOrderMenuItem , idOccupant : commande.idOccupant.concat('/api/occupants/'+newValue?.id)  });
                                    }else{
                                      setcommande({ ...commande,  lignesCommande: newOrderMenuItem ,idOccupant : commande.idOccupant.filter((s, sidx) => idx !== sidx)  });
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
                          <small onClick={AddligneCommandes} className="small ">Ajouter un occupant</small>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </form>

          </div>
        </div>
        <Dialog open={open} onClose={handleClose}
          PaperProps={{
            style: {
              width: '600px'
            },
          }}  >
          <form>

            <div className='row mt-2 ml-2'>
              <div className='col-md-8 col-sm-8 col-8'>
                <div className="form-group ">

                  <label htmlFor="exampleInputBorder">CIN de l'occupant </label>
                  <input type="text" className="form-control form-control-border" placeholder="....."
                    name='cin' value={occupant?.cin} onChange={onChangeValue} />
                </div>

              </div>
              <div className='col-md-4 col-sm-4 col-4'>
                <div className="form-group">

                </div>
              </div>
            </div>
            <div className="card-body">

              <ul className="nav nav-tabs small" id="custom-content-below-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="custom-content-below-test-tab" data-toggle="pill" href="#custom-content-below-test" role="tab" aria-controls="custom-content-below-test" aria-selected="false">Information Générale</a>
                </li>


              </ul>
              <div className="tab-content mt-4" id="custom-content-below-tabContent">

                <div className="tab-pane fade show active" id="custom-content-below-test" role="tabpanel" aria-labelledby="custom-content-below-test-tab">
                  <div className='row'>

                    <div className='col-6'>
                      <div className='row'>
                        <div className='col-3'>
                          <small><b>Nom</b></small>
                        </div>
                        <div className='col-8'>

                          <input type="text" className="form-control form-control-sm form-control-border border-dark" placeholder='Entrer nom'
                            name='nom' value={occupant?.nom} onChange={onChangeValue} />
                        </div>


                        <div className='col-3'>
                          <small><b>Prenom</b></small>
                        </div>
                        <div className='col-8'>

                          <input type="text" className="form-control form-control-sm form-control-border" placeholder="Entrer prenom"
                            name='prenom' value={occupant?.prenom} onChange={onChangeValue} />
                        </div>

                        <div className='col-3'>
                          <small><b>Email</b></small>
                        </div>
                        <div className='col-8'>


                          <input type="text" className="form-control form-control-sm form-control-border" placeholder="Entrer email"
                            name='email' value={occupant?.email} onChange={onChangeValue} />
                        </div>


                        <div className='col-3'>
                          <small><b>Tel</b></small>
                        </div>
                        <div className='col-8'>

                          <input type="text" className="form-control form-control-sm form-control-border" placeholder="Entrer Tel"
                            name='tel' value={occupant?.tel} onChange={onChangeValue} />
                        </div>

                        <div className='col-3'>
                          <small><b>Date Naissance</b></small>
                        </div>
                        <div className='col-8'>

                          <DateTimePickerComponent value={occupant?.dateNaissance} onChange={e => setoccupant({ ...occupant, dateNaissance: e.target.value })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                          {/*console.log(dateFormat(date, "yyyy/mm/dd"))*/}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className='card-footer bg-white small'>
              <Button className='float-right' onClick={handleClose}>Cancel</Button>
              <button onClick={(e) => saveoccupant(e)} className='btn bg-olive float-right'>sauvegarder</button>

            </div>

          </form>


        </Dialog>


      </div>


      {/*  



 <form onSubmit={handleSubmit}>
            <DialogTitle>Add a new film</DialogTitle>
            <DialogContent>

              <DialogContentText>
                Did you miss any film in our list? Please, add it!
              </DialogContentText>
              <div className='row'>
                <div className='col-6'>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={occupant?.reference}
                    onChange={(event) =>
                      setoccupant({
                        ...occupant,
                        reference: event.target.value,
                      })
                    }
                    label="reference"
                    type="text"
                    variant="standard"
                  />
                </div>
                <div className='col-6'>
                  <TextField
                    margin="dense"
                    id="name"
                    value={occupant?.designation}
                    onChange={(event) =>
                      setoccupant({
                        ...occupant,
                        designation: event.target.value,
                      })
                    }
                    label="designation"
                    type="number"
                    variant="standard"
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <input type="number" className="form-control form-control-sm form-control-border" placeholder="exp 5"
                  />
                </div>
                <div className='col-6'>
                  <input type="number" className="form-control form-control-sm form-control-border" placeholder="exp 5"
                  />
                </div>
              </div>



            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
*/}








      {/* ---------------------------------------- */}

    </>
  )


}



export default FormAddReservation
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { saveReservation } from '../../../redux/actions/reservationAction'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { toast } from "react-toastify"
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { getOccupant, saveOccupant } from '../../../redux/actions/occupantAction'
import { getTypologie } from '../../../redux/actions/typologieAction';
import { getEtablissement } from '../../../redux/actions/etablissementAction';
import { getMealPlan } from '../../../redux/actions/mealPlanAction';
import { getSearch } from '../../../redux/actions/searchAction';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { loadingComponent } from '../../../redux/actions/loadingAction';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { getMealPlanByIdEtab } from '../../../redux/actions/mealPlanAction';
import OccupantForm from './OccupantForm';
import { saveCommandeClient } from '../../../redux/actions/commandeAction';





const NewResa = () => {
    const filter = createFilterOptions();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { idEtab } = useParams()

    const [listOccupantForm , setListOccupantForm] = useState([])


    //
    const authReducer = useSelector((state) => state.authReducer)
    const { user1 } = authReducer



    const occu = useSelector((state) => state.occupantReducer)
    const { listOccupant } = occu

    //      get list of fournisseurs
    const sea = useSelector((state) => state.searchReducer)
    const { listSearch } = sea

    // get list of artices
    const etabs = useSelector((state) => state.etablissementReducer)
    const { listEtablissement } = etabs

    // get list of emplacements
    const typo = useSelector((state) => state.typologieReducer)
    const { listTypologies } = typo

    const Mp = useSelector((state) => state.mealPlanReducer)
    const { listMealPlanBYIDETAB } = Mp

    useEffect(() => {
        dispatch(getSearch(search))
        dispatch(getMealPlanByIdEtab(idEtab))
        NbrJours()
    }, [dispatch])


    // save demander d'achat 
    const [commande, setcommande] = useState({
        reservation: [

        ],
        clientId : user1?.idClient,
        etablissementId: listSearch[0].hotel.id
    
    })

    useEffect(()=>{
        

        const newOrderMenuItem = commande.reservation?.map((element, i) => {
            
            if (categorieId && categorieId !== element.typologie) return element;
            
            return { ...element, qte: element.qte, typologie: element.typologie, dateDebut: search.dateDu, dateFin: search.dateAu ,occupants : listOccupantForm};

        });

        setcommande({ ...commande, reservation: newOrderMenuItem });
        console.log(commande)


    },[setListOccupantForm,listOccupantForm])

    const savecommande = (e) => {
        e.preventDefault()
        
        dispatch(saveCommandeClient(commande, navigate))
        

    }


    const searchDispo = (e) => {

        e.preventDefault()
        setcommande({ ...commande, reservation: [] })
        setsearch(
            {
                ...search,
                ok: true,
            })

        if (search.dateDu != "Invalid date" && search.dateAu != "Invalid date" && search.nbAdultes != 0 && search.nbChambres != 0) {
            if (search?.dateDu >= search?.dateAu) {
                toast.error("if faut que date Du > date Au", { position: toast.POSITION.BOTTOM_LEFT })
                setsearch(
                    {
                        ...search,
                        ok: false,
                    })

            } else if (search?.nbChambres > search?.nbAdultes) {
                toast.error("if faut que nb Adultes > nb Chambres", { position: toast.POSITION.BOTTOM_LEFT })
                setsearch(
                    {
                        ...search,
                        ok: false,
                    })
            } else {
                settotale(0)
                setroomTypes([])
                setSelected()
                setnb(0)
                dispatch(getSearch(search))
            }
        } else {
            toast.error("if faut remplir tous les champs", { position: toast.POSITION.BOTTOM_LEFT })
            setsearch(
                {
                    ...search,
                    ok: false,
                })
        }

    }

    const numbers = (n) => {
        const t = []
        for (let i = 0; i <= n; i++) {
            t.push(i)
        }
        return t

    }

    const search1 = JSON.parse(localStorage.getItem('search'))

    const [search, setsearch] = useState({
        dateDu: search1?.dateDu,
        dateAu: search1?.dateAu,
        nbChambres: search1?.nbChambres,
        nbAdultes: search1?.nbAdultes,
        nbEnfants: search1?.nbEnfants,
        nbBebes: search1?.nbBebes,
        id: idEtab,
        ok: true,
        nbrRestant: numbers(search1?.nbChambres),
        nb: 0



    })

    const [numberOfDays, setNumberOfDays] = useState(0);

    const NbrJours = () => {
        const start = moment(search?.dateDu);
        const end = moment(search?.dateAu);
        const days = end.diff(start, 'days');

        setNumberOfDays(days);
    }


    const onChangeValue1 = (e) => {
        setsearch(
            {
                ...search,
                [e.target.name]: parseInt(e.target.value),

            }
        )
    }

    const onChangeValuenbCHam = (e) => {
        setsearch(
            {
                ...search,
                nbChambres: parseInt(e.target.value),
                nbrRestant: numbers(parseInt(e.target.value))
            }
        )
    }

    const [categorieId,setcategorieId] = useState(null)

    const [selected, setSelected] = useState();

    const handleChange = (idMeal, catid) => {


        let prixMeal1 = 0
       
        const newOrderMenuItem = commande.reservation?.map((element, i) => {
            if (catid !== element.typologie) return element;
            prixMeal1 = listMealPlanBYIDETAB?.filter(f => f.id == element?.mealPlan)?.map((elm, i) => {
                if (element.mealPlan == elm.id) return elm.prix;

            });

            return { ...element, qte: element.qte, typologie: element.typologie, dateDebut: search.dateDu, dateFin: search.dateAu, mealPlan: idMeal };
        });

        const prixMeal = listMealPlanBYIDETAB?.filter(f => f.id == idMeal)?.map((element, i) => {
            if (idMeal == element.id) return element.prix;

        });

        setcommande({ ...commande, reservation: newOrderMenuItem });
        let moins = prixMeal1[0] ? prixMeal1[0] : 0
        settotale((totale - (moins * numberOfDays)) + (prixMeal[0] * numberOfDays))

    };


    const verif = (categoryId) => {
        let ok = false
        commande?.reservation?.map((element, index) => {
            console.log(element)
            if (element.typologie === categoryId) {
                ok = true
            }

        })
        return ok
    }

    const changeQTE = (qte, catid, tarifs) => {
        const newOrderMenuItem = commande.reservation?.map((element, i) => {
            if (catid !== element.typologie) return element;
            if (qte < element.qte) {
                settotale(totale - tarifs * (element.qte - qte))
            } else {
                settotale(totale + tarifs * (qte - element.qte))
            }
            return { ...element, qte: qte, typologie: catid, dateDebut: search.dateDu, dateFin: search.dateAu };

        });

        setcommande({ ...commande, reservation: newOrderMenuItem });

    }



    const [totale, settotale] = useState(0)
    const [roomTypes, setroomTypes] = useState([])


    const handleQuantityChange = (categoryId, quantity, tarifs, capacite, nom) => {


        if (commande?.reservation?.length === 0) {
            settotale(0)
            setcommande({
                ...commande, reservation: commande.reservation.concat([
                    {
                        dateDebut: search?.dateDu,
                        dateFin: search?.dateAu,
                        qte: quantity,
                        typologie: categoryId,
                        etablissement: idEtab


                    }])

            })

            setroomTypes(roomTypes.concat([{
                type: nom,
                capacite: capacite,
                qte: quantity,
                id: categoryId
            },]))

            settotale(tarifs * quantity)

        } else {



            if (verif(categoryId) === true) {
                if (quantity === 0) {
                    setcommande({
                        ...commande, reservation: commande.reservation.filter((s, sidx) => s.typologie !== categoryId)
                    })
                    if (commande?.reservation?.length === 0) {
                        settotale(0)
                    }


                } else {

                    changeQTE(quantity, categoryId, tarifs)

                }

            } else {
                setcommande({
                    ...commande, reservation: commande.reservation.concat([
                        {
                            dateDebut: search?.dateDu,
                            dateFin: search?.dateAu,
                            qte: quantity,
                            typologie: categoryId,
                            mealPlan: selected,
                            etablissement: idEtab


                        }])
                })
                setroomTypes(roomTypes.concat([{
                    type: nom,
                    capacite: capacite,
                    qte: quantity,
                    id: categoryId
                },]))


                settotale(totale + (tarifs * quantity))
            }

        }



    };

    const [nb, setnb] = useState()
    const [MealPrix, setMealPrix] = useState(0)
    const [mp, setmp] = useState()

    const getPrixMealPlan = (mealId) => {
        setMealPrix(0)
        const m = listMealPlanBYIDETAB.filter(f => f.id == mealId).map(f => { return f.prix })

        return (m[0] * numberOfDays)

    }


    const renderOccupants = () => {
        return (<div>
            
            {roomTypes.map((roomType, index) => (
                <OccupantForm
                    key={index}
                    roomType={roomType.type}
                    capacity={roomType.capacite}
                    qte={roomType.qte}
                    commande={commande}
                    id={roomType.id}
                    setlistOccupants = {setListOccupantForm}
                />
            ))}
        </div>)
    }

    const [affiche, setaffiche] = useState('')

    const AfficheOccupants = () => {

        setaffiche('ok')
        settaga(JSON.stringify(commande) + JSON.stringify(roomTypes))
    }

    const [taga, settaga] = useState()






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

                            <h5>Disponibilité</h5>
                            <div className='row' style={{ background: '#FFB700', paddingTop: '10px', paddingBottom: '10px' }}>


                                <div className='col-md-2 col-sm-2 col-2'>
                                    <small><b>Chambres: </b></small>
                                    <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "100%" }}
                                        name='nbChambres' value={search.nbChambres} onChange={onChangeValuenbCHam} />
                                </div>
                                <div className='col-md-2 col-sm-2 col-2'>
                                    <small><b>Adultes: </b></small>
                                    <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "100%" }}
                                        name='nbAdultes' value={search.nbAdultes} onChange={onChangeValue1} />
                                </div>
                                <div className='col-md-2 col-sm-2 col-2'>
                                    <small><b>Enfants: </b></small>
                                    <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "100%" }}
                                        name='nbEnfants' value={search.nbEnfants} onChange={onChangeValue1} />
                                </div>

                                <div className='col-md-2 col-sm-2 col-2'>
                                    <small><b>Bebes: </b></small>
                                    <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "100%" }}
                                        name='nbBebes' value={search.nbBebes} onChange={onChangeValue1} />
                                </div>

                                <div className='col-2'>
                                    <small><b>Date debut</b></small>
                                    <DateTimePickerComponent format="yyyy-MM-dd" value={search?.dateDu} onChange={e => setsearch({ ...search, dateDu: moment(e.target.value).format('YYYY-MM-DD') })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                                </div>
                                <div className='col-2'>
                                    <small><b>Date Fin</b></small>
                                    <DateTimePickerComponent format='yyyy-MM-dd' value={search?.dateAu} onChange={e => setsearch({ ...search, dateAu: moment(e.target.value).format('YYYY-MM-DD') })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                                </div>
                                <div className='col-12' style={{ marginTop: '20px' }}>
                                    <button className='col-12 btn bg-olive' onClick={(e) => searchDispo(e)}>Modifier la recherche</button>
                                </div>
                            </div>



                        </form>







                    </div>
                    <h5>Toutes les chambres disponibles</h5>
                    {listSearch?.length <= 0 || search?.ok == false ? <h3 className='text-center'>Aucune Typologie Disponible</h3> :
                        <div className="tab-pane fade show active" id="custom-content-below-test" role="tabpanel" aria-labelledby="custom-content-below-test-tab">
                            <table className='table align-middle  mb-0 bg-white   table-lg' style={{ textAlign: "center" }}>
                                <thead className='large'>
                                    <tr>
                                        <th>Typologie</th>
                                        <th>Capacité</th>
                                        <th>Tarif de {numberOfDays} Jour(s)</th>
                                        <th>Sélectionner des chambres</th>
                                        <th>Meal Plan</th>



                                    </tr>

                                </thead>

                                {listSearch?.map(menu =>
                                    <tbody>



                                        {menu?.availableRooms?.map((menuItem, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    {menuItem?.room?.nom}


                                                </td>
                                                <td>
                                                    {menuItem?.room?.capacite}
                                                </td>

                                                <td>
                                                    {menuItem?.prixTotale}
                                                </td>

                                                <td>
                                                    <select className="form-control  form-control-border form-control-sm"
                                                        value={nb}

                                                        onChange={(e) => handleQuantityChange(menuItem?.room?.id, parseInt(e.target.value), menuItem?.prixTotale, menuItem?.room?.capacite, menuItem?.room?.nom)}
                                                    >
                                                        {Array.from({ length: menuItem?.qte_dispo + 1 }, (_, index) => index).map((number, i) => (
                                                            <option key={number} value={number}>{number}</option>
                                                        ))}
                                                    </select>


                                                </td>

                                                <td>
                                                    <select className="form-control  form-control-border form-control-sm"
                                                        value={mp}
                                                        onChange={(e) => { handleChange(parseInt(e.target.value), menuItem?.room?.id) }}>
                                                        <option selected>-----</option>
                                                        {
                                                            listMealPlanBYIDETAB.map(f =>
                                                                <option key={f.id} value={f.id} >{f.nom + " : " + f.prix + " DT"}</option>
                                                            )}
                                                    </select>
                                                </td>







                                            </tr>))}

                                    </tbody>)}
                            </table>

                            <div className='float-right small'>
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={2}>Total</TableCell>
                                    <TableCell align="right">{totale + ' DT'}</TableCell>
                                </TableRow>

                            </div>
                        </div>
                    }
                    <button className='btn bg-olive' onClick={AfficheOccupants}>Saisie Occupants</button>
                    {affiche === 'ok' ? renderOccupants() : null}
                  


                </div>
                       {JSON.stringify(commande)}
            </div>





        </>
    )


}



export default NewResa
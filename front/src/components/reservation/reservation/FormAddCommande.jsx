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
import { indigo } from '@mui/material/colors';

import OccupantForm from './OccupantForm';




const FormAddCommande = () => {
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
        etat: 'En Attente'


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

                }]), idOccupant: commande.idOccupant.concat([

                ])
        })
    };

    const RemoveligneCommandes = idx => () => {
        setcommande({
            ...commande, lignesCommande: commande.lignesCommande.filter((s, sidx) => idx !== sidx), idOccupant: commande.idOccupant.filter((s, sidx) => idx !== sidx)
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





 

    const roomTypes = JSON.parse(localStorage.getItem('rommTypes'))



    const [testtt, settesttt] = useState(

        roomTypes




    )



    const [occupants, setOccupants] = useState([]);
    const [resa,setresa] = useState({
      lignesCommande: [
              
      ],
    })
    
  
    const handleInputChange = (index, event) => {
      const { name, value } = event.target;
      const newOccupants = [...occupants];
      newOccupants[index] = {
        ...newOccupants[index],
        [name]: value
      };
      setOccupants(newOccupants);
    };
  
    const addOccupant = () => {
      setOccupants([...occupants, {}]);
    };
  
    const removeOccupant = (index) => {
      const newOccupants = [...occupants];
      newOccupants.splice(index, 1);
      setOccupants(newOccupants);
    };







    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h5>Commande/Nouveau</h5>
                                <button className='btn bg-olive' onClick={(e) => savecommande(e)}>Sauvegarder</button>
                                <Link className='ml-1 btn bg-white' to={'/etablissement/reservations'}>Annuler</Link>
                            </div>

                        </div>
                    </div>
                </section>

                <div>
            <h2>Room Selection</h2>
            {JSON.stringify(roomTypes)}
            {testtt.map((roomType, index) => (
                <OccupantForm
                    key={index}
                    roomType={roomType.type}
                    capacity={roomType.capacite}
                    qte={roomType.qte}
                    commande={commande}
                    id={roomType.id}
                />
            ))}
        </div>


               
            </div>



        </>
    )


}



export default FormAddCommande
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import InstanceAxios from "../../../InstanceAxios"
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import {toast} from "react-toastify"
import moment from 'moment';

const Search = () => {

    const dispatch = useDispatch()

   
    const [listItems, setListItems] = useState([]);
    const [showList, setShowList] = useState(false);
    const [search, setsearch] = useState({
        dateDe: '',
        dateAu: '',
        adresse: '',
        nbChambres: 0,
        nbAdultes: 0,
        nbEnfants: 0,
        nbBebes: 0,
        ok : true,
      
        




    })
   
    const [numberOfDays, setNumberOfDays] = useState(0);

    const fetchData = async () => {
        try {
            let response = await InstanceAxios.post('http://localhost:8000/api/search', search, { withCredentials: false })

            setListItems(await response.data);

            setShowList(true)

        } catch (error) {
            console.error('Error fetching data:', error);
            
            
        }


    };

    const handleButtonClick = () => {

        setsearch(
            {
                ...search,
                ok: true,
            })

            

        if (search.dateDe != "Invalid date" && search.dateAu != "Invalid date" && search.nbAdultes != 0 && search.nbChambres != 0) {
            if(search?.dateDe >= search?.dateAu){
                toast.error("if faut que date Du > date Au", { position: toast.POSITION.BOTTOM_LEFT })
            setsearch(
                {
                    ...search,
                    ok: false,
                })
            }else{
            const start = moment(search?.dateDe);
        const end = moment(search?.dateAu);
        const days = end.diff(start, 'days');
        console.log(days)
        setNumberOfDays(days);
        fetchData();
        localStorage.setItem('search', JSON.stringify(search));}
        } else  {
            toast.error("if faut remplir tous les champs", { position: toast.POSITION.BOTTOM_LEFT })
            setsearch(
                {
                    ...search,
                    ok: false,
                })
        }


        
       
    };

    const onChangeValue = (e) => {
        setsearch(
            {
                ...search,
                [e.target.name]: e.target.value,
            }
        )
    }

    const onChangeValue1 = (e) => {
        setsearch(
            {
                ...search,
                [e.target.name]: parseInt(e.target.value),
            }
        )
    }


    return (
        <>

            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12">
                                <h5>Search/Reservation </h5>
                                <div className='row' style={{ background: '#FFB700', paddingTop: '10px', paddingBottom: '10px' }}>
                                    <div className='col-4'>
                                        <small><b>Adresse(Ou Nom Etablissement): </b></small>
                                        <input className="form-control form-control-border" placeholder="Ecrire Ici"
                                            name='adresse' value={search.adresse} onChange={onChangeValue} />
                                    </div>

                                    <div className='col-2'>
                                        <small><b>NbChambres: </b></small>
                                        <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "80px" }}
                                            name='nbChambres' value={search.nbChambres} onChange={onChangeValue1} />
                                    </div>
                                    <div className='col-2'>
                                        <small><b>NbAdultes: </b></small>
                                        <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "80px" }}
                                            name='nbAdultes' value={search.nbAdultes} onChange={onChangeValue1} />
                                    </div>
                                    <div className='col-2'>
                                        <small><b>NbEnfants: </b></small>
                                        <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "80px" }}
                                            name='nbEnfants' value={search.nbEnfants} onChange={onChangeValue1} />
                                    </div>

                                    <div className='col-2'>
                                        <small><b>NbBebes: </b></small>
                                        <input className="form-control form-control-border" type='number' placeholder='0' style={{ width: "80px" }}
                                            name='nbBebes' value={search.nbBebes} onChange={onChangeValue1} />
                                    </div>

                                    <div className='col-5'>
                                        <small><b>Date debut</b></small>
                                        <DateTimePickerComponent format="yyyy-MM-dd" value={search?.dateDe} onChange={e => setsearch({ ...search, dateDe: moment(e.target.value).format('YYYY-MM-DD') })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                                    </div>
                                    <div className='col-5'>
                                        <small><b>Date Fin</b></small>
                                        <DateTimePickerComponent format='yyyy-MM-dd' value={search?.dateAu} onChange={e => setsearch({ ...search, dateAu: moment(e.target.value).format('YYYY-MM-DD') })} placeholder='Choose a date and time' ></DateTimePickerComponent>
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <button className='col-12btn bg-olive' onClick={handleButtonClick}>Rechercher</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                <section className="content">
                    <div className="container-fluid">


                        
                            {listItems.length <= 0 || search?.ok == false? <h3 className='text-center'>Aucune Typologie Disponible</h3> :
                                listItems.map(ArtOrde =>

                                    <div className="row">

                                    <div className="col-lg-12 col-6">
                                        <h5>{ArtOrde?.hotel?.nom}</h5>
                                        

                                            {ArtOrde?.availableRooms?.map(room =>
                                            <div className="small-box bg-info">
                                                <div className="inner">
                                                 
                                                   <h3>{room?.room?.nom}</h3>
                                                   <div className='row'>
                                                   <div className='col-md-4 col-sm-4 col-4'>
                                                   <div className="form-group">
                                                   <p>capacité : {room?.room?.capacite}</p>
                                                   </div>
                                                   </div>
                                                   <div className='col-md-4 col-sm-4 col-4'>
                                                   <div className="form-group">
                                                   <p>prix de {numberOfDays} jour(s): {room?.prixTotale} DT</p>
                                                   </div>
                                                   </div>
                                                   </div>
                                                  
                                                </div>
                                                
                                                <div className="icon">
                                                <i className="ion ion-home" />
                                                
                                            </div>
                                            <Link className="small-box-footer" to={'/reservation/newResa/'+ArtOrde?.hotel?.id}>More info <i className="fas fa-arrow-circle-right" /></Link>
                                                </div>
                                            )}
    
                                        </div>
                                        </div>
                                  
                                )}

                        </div>
                 
                </section>
                                              
            </div>

        </>
    )

}

export default Search
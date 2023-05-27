import InstanceAxios from "../../InstanceAxios"
import {RESERVATION_ERROR,GET_RESERVATION,GET_RESERVATION_BY_ID,
        GET_RESERVATION_BY_ID_ERROR,SAVE_RESERVATION,SAVE_RESERVATION_ERROR,
        CONFIRMATION_RESERVATION_BY_ID,CONFIRMATION_RESERVATION_BY_ID_ERROR, 
        REMOVE_SELECTED_RESERVATION ,GET_RESERVATION_BY_ID2,CREATE_FACTURE,CREATE_FACTURE_ERROR, UPDATE_RESERVATION_ERROR, UPDATE_RESERVATION, UPLOAD_PDF_FACTURE} from "../type/reservation";
import {ISLOADING,LOADING} from "../type/loading"
import {RESERVATION_URL} from "../url"
import {toast} from "react-toastify"


const getReservation=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/getAllReservations').then(
        response=>{
            dispatch({
                type:GET_RESERVATION,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:RESERVATION_ERROR,
                payload:error
            })
        })
}

const saveReservation=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post(RESERVATION_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_RESERVATION,
                payload:response.data
            })
            navigate('/etablissement/reservations')
            toast.success("La Reservation a été enrigistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_RESERVATION_ERROR
            })
        })
}
const updateReservation=(idOrder,order,navigate)=>async dispatch=>{
    await InstanceAxios.put(RESERVATION_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_RESERVATION,
                payload:response.data
            })
           navigate('/etablissement/reservation/'+idOrder)
           
           toast.success("La Reservation a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_RESERVATION_ERROR
            })
        })
}
const getReservationById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/ReservationById/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_RESERVATION_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_RESERVATION_BY_ID_ERROR
            })
        })
}

const getReservationById2=articleId=>async dispatch=>{
    await InstanceAxios.get(RESERVATION_URL+'/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_RESERVATION_BY_ID2,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_RESERVATION_BY_ID_ERROR
            })
        })
}
const confirmationReservation=(orderId,navigate)=>async dispatch=>{
    await InstanceAxios.put(RESERVATION_URL+"/confirmation/"+orderId, { withCredentials: false }).then(
        response=>{
            
            dispatch({
                type:CONFIRMATION_RESERVATION_BY_ID,
                //payload:response.data
            })
            
            navigate('/carre/reservation/' +orderId)
            toast.success("La Reservation a été confirmé",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:CONFIRMATION_RESERVATION_BY_ID_ERROR
            })
        })
}

const removeSelectedReservation=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_RESERVATION
    })
}

const createFacture=(idDemande,navigate)=>async dispatch=>{
    await InstanceAxios.put(RESERVATION_URL+"/createfacture/"+idDemande).then(
        response=>{
           
            dispatch({
                type:CREATE_FACTURE,
                //payload:response.data
            })
            navigate('/carre/reservation/' + idDemande)
            toast.success("La facture carre a été crée",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:CREATE_FACTURE_ERROR
            })
        })
}
const uploadPdfFacture = (id) => async dispatch => {
     await InstanceAxios.get(RESERVATION_URL+"/test/"+id ).then(
     response=>{
    dispatch({
        type: UPLOAD_PDF_FACTURE,
       // payload: response.data
    });
})
}



export {getReservation,saveReservation,getReservationById,
        confirmationReservation,removeSelectedReservation,
        createFacture,updateReservation,uploadPdfFacture,getReservationById2} 
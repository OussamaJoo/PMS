import InstanceAxios from "../../InstanceAxios"
import {OCCUPANT_ERROR,GET_OCCUPANT,GET_OCCUPANT_BY_ID,
        GET_OCCUPANT_BY_ID_ERROR,SAVE_OCCUPANT,SAVE_OCCUPANT_ERROR,
        CONFIRMATION_OCCUPANT_BY_ID,CONFIRMATION_OCCUPANT_BY_ID_ERROR, 
        REMOVE_SELECTED_OCCUPANT ,CREATE_FACTURE,CREATE_FACTURE_ERROR, UPDATE_OCCUPANT_ERROR, UPDATE_OCCUPANT,  UPLOAD_PDF_FACTURE} from "../type/occupant";
import {ISLOADING,LOADING} from "../type/loading"
import {OCCUPANT_URL} from "../url"
import {toast} from "react-toastify"


const getOccupant=()=>async dispatch=>{
    await InstanceAxios.get(OCCUPANT_URL).then(
        response=>{
            dispatch({
                type:GET_OCCUPANT,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:OCCUPANT_ERROR,
                payload:error
            })
        })
}

const saveOccupant=order=>async dispatch=>{
    await InstanceAxios.post(OCCUPANT_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_OCCUPANT,
                payload:response.data
            })
            toast.success("Occupant ajouté",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_OCCUPANT_ERROR
            })
        })
}
const updateOccupant=(idOrder,order,navigate)=>async dispatch=>{
    await InstanceAxios.put(OCCUPANT_URL+'/update/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_OCCUPANT,
                payload:response.data
            })
           navigate('/carre/occupant/'+idOrder)
           
           toast.success("La ligne commandea été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_OCCUPANT_ERROR
            })
        })
}
const getOccupantById=articleId=>async dispatch=>{
    await InstanceAxios.get(OCCUPANT_URL+"/get/"+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_OCCUPANT_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_OCCUPANT_BY_ID_ERROR
            })
        })
}
const confirmationOccupant=(orderId,navigate)=>async dispatch=>{
    await InstanceAxios.put(OCCUPANT_URL+"/confirmation/"+orderId, { withCredentials: false }).then(
        response=>{
            
            dispatch({
                type:CONFIRMATION_OCCUPANT_BY_ID,
                //payload:response.data
            })
            
            navigate('/carre/occupant/' +orderId)
            toast.success("La ligne commandea été confirmé",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:CONFIRMATION_OCCUPANT_BY_ID_ERROR
            })
        })
}

const removeSelectedOccupant=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_OCCUPANT
    })
}

const createFacture=(idDemande,navigate)=>async dispatch=>{
    await InstanceAxios.put(OCCUPANT_URL+"/createfacture/"+idDemande).then(
        response=>{
           
            dispatch({
                type:CREATE_FACTURE,
                //payload:response.data
            })
            navigate('/carre/occupant/' + idDemande)
            toast.success("La facture carre a été crée",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:CREATE_FACTURE_ERROR
            })
        })
}
const uploadPdfFacture = (id) => async dispatch => {
     await InstanceAxios.get(OCCUPANT_URL+"/test/"+id ).then(
     response=>{
    dispatch({
        type: UPLOAD_PDF_FACTURE,
       // payload: response.data
    });
})
}



export {getOccupant,saveOccupant,getOccupantById,
        confirmationOccupant,removeSelectedOccupant,
        createFacture,updateOccupant,uploadPdfFacture} 
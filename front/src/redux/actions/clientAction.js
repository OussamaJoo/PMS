import InstanceAxios from "../../InstanceAxios"
import {CLIENT_ERROR,GET_CLIENT,GET_CLIENT_BY_ID,
        GET_CLIENT_BY_ID_ERROR,SAVE_CLIENT,SAVE_CLIENT_ERROR,
        CONFIRMATION_CLIENT_BY_ID_ERROR, 
        REMOVE_SELECTED_CLIENT , UPDATE_CLIENT_ERROR, UPDATE_CLIENT} from "../type/client";
import {ISLOADING,LOADING} from "../type/loading"
import {CLIENT_URL} from "../url"
import {toast} from "react-toastify"


const getClient=()=>async dispatch=>{
    await InstanceAxios.get(CLIENT_URL).then(
        response=>{
            dispatch({
                type:GET_CLIENT,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:CLIENT_ERROR,
                payload:error
            })
        })
}

const saveClient=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post(CLIENT_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_CLIENT,
                payload:response.data
            })
            navigate('/etablissement/client')
            toast.success("Le client a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_CLIENT_ERROR
            })
            toast.error("Le client déja existe",{position:toast.POSITION.BOTTOM_LEFT})
        })
}
const updateClient=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put(CLIENT_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_CLIENT,
                payload:response.data
            })
           
           
           toast.success("La Client a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_CLIENT_ERROR
            })
            navigate('/etablissement/client/'+idOrder)
           
           toast.error("Remplir tous les champs",{position:toast.POSITION.BOTTOM_LEFT})
        })
}
const getClientById=articleId=>async dispatch=>{
    await InstanceAxios.get(CLIENT_URL+'/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_CLIENT_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_CLIENT_BY_ID_ERROR
            })
        })
}

const removeSelectedClient=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_CLIENT
    })
}






export {getClient,saveClient,getClientById,
        removeSelectedClient,
        updateClient} 
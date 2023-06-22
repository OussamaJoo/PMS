import InstanceAxios from "../../InstanceAxios"
import {DISPO_ERROR,GET_DISPO,GET_DISPO_BY_ID,
        GET_DISPO_BY_ID_ERROR,SAVE_DISPO,SAVE_DISPO_ERROR,
        CONFIRMATION_DISPO_BY_ID_ERROR, 
        REMOVE_SELECTED_DISPO , UPDATE_DISPO_ERROR, UPDATE_DISPO,GET_DISPO_BY_ID_ETAB,DISPO_BY_ID_ETAB_ERROR} from "../type/dispo";
import {ISLOADING,LOADING} from "../type/loading"
import {DISPO_URL} from "../url"
import {toast} from "react-toastify"


const getDispo=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllDispos').then(
        response=>{
            dispatch({
                type:GET_DISPO,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:DISPO_ERROR,
                payload:error
            })
        })
}

const getDispoByIdEtab=(idEtab)=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllDispoByIdEtab/'+idEtab).then(
        response=>{
            dispatch({
                type:GET_DISPO_BY_ID_ETAB,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:DISPO_BY_ID_ETAB_ERROR,
                payload:error
            })
        })
}

const saveDispo=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addDispo',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_DISPO,
                payload:response.data
            })
            navigate('/disponibilite/disponibilites')
            toast.success("Le disponiblité a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_DISPO_ERROR
            })
        })
}

const saveDispo2=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addDispo',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_DISPO,
                payload:response.data
            })
            navigate('/responsable/disponibilites')
            toast.success("Le disponiblité a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_DISPO_ERROR
            })
        })
}
const updateDispo=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put('http://localhost:8000/api/editDispo/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_DISPO,
                payload:response.data
            })
           
           toast.success("La Dispo a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_DISPO_ERROR
            })
            navigate('/disponibilite/dispo/'+idOrder)
           
           toast.error("Remplir tous les champs",{position:toast.POSITION.BOTTOM_LEFT})
        })
}
const getDispoById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/DispoByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_DISPO_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_DISPO_BY_ID_ERROR
            })
        })
}

const removeSelectedDispo=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_DISPO
    })
}






export {getDispo,saveDispo,getDispoById,
        removeSelectedDispo,saveDispo2,
        updateDispo,getDispoByIdEtab} 
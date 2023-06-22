import InstanceAxios from "../../InstanceAxios"
import {TARIF_ERROR,GET_TARIF,GET_TARIF_BY_ID,
        GET_TARIF_BY_ID_ERROR,SAVE_TARIF,SAVE_TARIF_ERROR, 
        REMOVE_SELECTED_TARIF , UPDATE_TARIF_ERROR, UPDATE_TARIF,GET_ALL_TARIF_BY_ID_ETAB, ALL_TARIF_BY_ID_ETAB_ERROR} from "../type/tarif";
import {ISLOADING,LOADING} from "../type/loading"
import {TARIF_URL} from "../url"
import {toast} from "react-toastify"


const getTarif=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllTarifs').then(
        response=>{
            dispatch({
                type:GET_TARIF,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:TARIF_ERROR,
                payload:error
            })
        })
}

const getAllTarifByIdEtab=(idEtab)=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllTarifByIdEtab/'+idEtab).then(
        response=>{
            dispatch({
                type:GET_ALL_TARIF_BY_ID_ETAB,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:ALL_TARIF_BY_ID_ETAB_ERROR,
                payload:error
            })
        })
}

const saveTarif=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addTarif',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_TARIF,
                payload:response.data
            })
            navigate('/disponibilite/tarifs')
            toast.success("Le tarif a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_TARIF_ERROR
            })
        })
}

const saveTarif2=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addTarif',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_TARIF,
                payload:response.data
            })
            navigate('/responsable/tarifs')
            toast.success("Le tarif a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_TARIF_ERROR
            })
        })
}
const updateTarif=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put('http://localhost:8000/api/editTarif/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_TARIF,
                payload:response.data
            })
         
           
           toast.success("La Tarif a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_TARIF_ERROR
            })
            
           
           toast.error("Remplir tous les champs",{position:toast.POSITION.BOTTOM_LEFT})
        })
}
const getTarifById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/TarifByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_TARIF_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_TARIF_BY_ID_ERROR
            })
        })
}

const removeSelectedTarif=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_TARIF
    })
}






export {getTarif,saveTarif,getTarifById,
        removeSelectedTarif,saveTarif2,
        updateTarif,getAllTarifByIdEtab} 
import InstanceAxios from "../../InstanceAxios"
import {ETABLISSEMENT_ERROR,GET_ETABLISSEMENT,GET_ETABLISSEMENT_BY_ID,
        GET_ETABLISSEMENT_BY_ID_ERROR,SAVE_ETABLISSEMENT,SAVE_ETABLISSEMENT_ERROR,
        REMOVE_SELECTED_ETABLISSEMENT , UPDATE_ETABLISSEMENT_ERROR, UPDATE_ETABLISSEMENT} from "../type/etablissement";
import {ISLOADING,LOADING} from "../type/loading"
import {ETAB_URL} from "../url"
import {toast} from "react-toastify"


const getEtablissement=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllEtabs').then(
        response=>{
            dispatch({
                type:GET_ETABLISSEMENT,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:ETABLISSEMENT_ERROR,
                payload:error
            })
        })
}

const saveEtablissement=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post(ETAB_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_ETABLISSEMENT,
                payload:response.data
            })
            navigate('/etablissement/etablissements')
            toast.success("L'établissement a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_ETABLISSEMENT_ERROR
            })
        })
}
const updateEtablissement=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put(ETAB_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_ETABLISSEMENT,
                payload:response.data
            })
           navigate('/etablissement/etablissement/'+idOrder)
           
           toast.success("L'établissement a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_ETABLISSEMENT_ERROR
            })
        })
}
const getEtablissementById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/EtabByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_ETABLISSEMENT_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_ETABLISSEMENT_BY_ID_ERROR
            })
        })
}


const removeSelectedEtablissement=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_ETABLISSEMENT
    })
}






export {getEtablissement,saveEtablissement,getEtablissementById,
        removeSelectedEtablissement,updateEtablissement} 
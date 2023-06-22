import InstanceAxios from "../../InstanceAxios"
import {COMMANDE_ERROR,GET_COMMANDE,GET_COMMANDE_BY_ID,
        GET_COMMANDE_BY_ID_ERROR,SAVE_COMMANDE,SAVE_COMMANDE_ERROR,
        REMOVE_SELECTED_COMMANDE , UPDATE_COMMANDE_ERROR, UPDATE_COMMANDE,CONFIRMATION_COMMANDE_BY_ID,CONFIRMATION_COMMANDE_BY_ID_ERROR,
    GET_COMMANDE_BY_ID_CLIENT,GET_COMMANDE_BY_ID_CLIENT_ERROR,GET_COMMANDE_BY_ID_ETABLISSEMENT,GET_COMMANDE_BY_ID_ETABLISSEMENT_ERROR} from "../type/commande";
import {ISLOADING,LOADING} from "../type/loading"
import {ETAB_URL} from "../url"
import {toast} from "react-toastify"


const getCommande=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllCommandes').then(
        response=>{
            dispatch({
                type:GET_COMMANDE,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:COMMANDE_ERROR,
                payload:error
            })
        })
}

const getCommandeByIdClient=(idClient)=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/CommandeByIdClient/'+idClient).then(
        response=>{
            dispatch({
                type:GET_COMMANDE_BY_ID_CLIENT,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:GET_COMMANDE_BY_ID_CLIENT_ERROR,
                payload:error
            })
        })
}

const getCommandeByIdEtab=(idEtab)=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/CommandeByIdEtab/'+idEtab).then(
        response=>{
            dispatch({
                type:GET_COMMANDE_BY_ID_ETABLISSEMENT,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:GET_COMMANDE_BY_ID_ETABLISSEMENT_ERROR,
                payload:error
            })
        })
}

const saveCommande=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addCommande',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_COMMANDE,
                payload:response.data
            })
            navigate('/commande/commandes')
            toast.success("La commande a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_COMMANDE_ERROR
            })
            toast.error("Typologie non disponible",{position:toast.POSITION.BOTTOM_LEFT})
        })
}

const saveCommandeClient=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/addCommande',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_COMMANDE,
                payload:response.data
            })
            navigate('/client/commandes')
            toast.success("La commande a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_COMMANDE_ERROR
            })
            toast.error("Typologie non disponible",{position:toast.POSITION.BOTTOM_LEFT})
        })
}
const updateCommande=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put(ETAB_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_COMMANDE,
                payload:response.data
            })
          
           
           toast.success("L'établissement a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_COMMANDE_ERROR
            })
        })
}
const getCommandeById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/CmdByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_COMMANDE_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_COMMANDE_BY_ID_ERROR
            })
        })
}

const confirmationCommande=(orderId,navigate)=>async dispatch=>{
    await InstanceAxios.put('http://localhost:8000/api/annulerCmd/'+orderId, { withCredentials: false }).then(
        response=>{
            
            dispatch({
                type:CONFIRMATION_COMMANDE_BY_ID,
                //payload:response.data
            })
            
            navigate('/etablissement/reservation/' +orderId)
            toast.success("La Commande a été annulée",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:CONFIRMATION_COMMANDE_BY_ID_ERROR
            })
        })
}


const removeSelectedCommande=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_COMMANDE
    })
}






export {getCommande,saveCommande,getCommandeById,
        removeSelectedCommande,updateCommande,confirmationCommande,getCommandeByIdClient,saveCommandeClient,getCommandeByIdEtab} 
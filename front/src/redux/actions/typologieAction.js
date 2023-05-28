import InstanceAxios from "../../InstanceAxios"
import {TYPOLOGIE_ERROR,GET_TYPOLOGIE,GET_TYPOLOGIE_BY_ID,
        GET_TYPOLOGIE_BY_ID_ERROR,SAVE_TYPOLOGIE,SAVE_TYPOLOGIE_ERROR,
        REMOVE_SELECTED_TYPOLOGIE , UPDATE_TYPOLOGIE_ERROR, UPDATE_TYPOLOGIE} from "../type/typologie";
import {ISLOADING,LOADING} from "../type/loading"
import {TYPOLOGIE_URL} from "../url"
import {toast} from "react-toastify"


const getTypologie=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllTypologies').then(
        response=>{
            dispatch({
                type:GET_TYPOLOGIE,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:TYPOLOGIE_ERROR,
                payload:error
            })
        })
}

const saveTypologie=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post(TYPOLOGIE_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_TYPOLOGIE,
                payload:response.data
            })
            navigate('/etablissement/typologies')
            toast.success("Le typologie a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_TYPOLOGIE_ERROR
            })
            
        })
}
const updateTypologie=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put(TYPOLOGIE_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_TYPOLOGIE,
                payload:response.data
            })
           navigate('/etablissement/typologie/'+idOrder)
           
           toast.success("Le typologie a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_TYPOLOGIE_ERROR
            })
        })
}
const getTypologieById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/TypologieByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_TYPOLOGIE_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_TYPOLOGIE_BY_ID_ERROR
            })
        })
}

const getTypologieById2=typologieId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000'+typologieId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_TYPOLOGIE_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_TYPOLOGIE_BY_ID_ERROR
            })
        })
}


const removeSelectedTypologie=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_TYPOLOGIE
    })
}






export {getTypologie,saveTypologie,getTypologieById,
        removeSelectedTypologie,updateTypologie,getTypologieById2} 
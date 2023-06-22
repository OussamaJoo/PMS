import InstanceAxios from "../../InstanceAxios"
import { TYPEETAB_ERROR,GET_TYPEETAB,GET_TYPEETAB_BY_ID,GET_TYPEETAB_BY_ID_ERROR,
    REMOVE_SELECTED_TYPEETAB,SAVE_TYPEETAB,SAVE_TYPEETAB_ERROR, UPDATE_TYPEETAB,
     UPDATE_TYPEETAB_ERROR,
UPLOAD_IMAGE_TYPEETAB} from "../type/typeEtab";
import {ISLOADING,LOADING} from "../type/loading"
import {TYPEETAB_URL} from "../url"
import {toast} from "react-toastify"


const getTypeEtab=()=>async dispatch=>{
    await InstanceAxios.get(TYPEETAB_URL).then(
        response=>{
            dispatch({
                type:GET_TYPEETAB,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:TYPEETAB_ERROR,
                payload:error
            })
        })
}
const saveTypeEtabs=(typeEtab,navigate)=>async dispatch=>{
    await InstanceAxios.post('api/createTypeEtab',typeEtab, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_TYPEETAB,
                payload:response.data
            })
            navigate('/etablissement/types')
            toast.success('La TypeEtab a été enregistré',{position:toast.POSITION.BOTTOM_LEFT})
            
        }).catch(error=>{
            dispatch({
                type:SAVE_TYPEETAB_ERROR
            })
            toast.error('Type déja existe',{position:toast.POSITION.BOTTOM_LEFT})
        })
}

const updateTypeEtab=(typeEtab,idTypeEtab,navigate)=>async dispatch=>{
    await InstanceAxios.put(TYPEETAB_URL+'/'+idTypeEtab,typeEtab ).then(
        response=>{
            dispatch({
                type:UPDATE_TYPEETAB,
                payload:response.data
            })
          
           toast.success("La typeEtab a été modifié",{position:toast.POSITION.BOTTOM_LEFT})

        }).catch(error=>{
            dispatch({
                type:UPDATE_TYPEETAB_ERROR
            })
        })
}
const getTypeEtabById=typeEtabId=>async dispatch=>{
    await InstanceAxios.get(TYPEETAB_URL+"/"+typeEtabId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_TYPEETAB_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_TYPEETAB_BY_ID_ERROR
            })
        })
}

const getTypeEtabById2=typeEtabId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000'+typeEtabId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_TYPEETAB_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_TYPEETAB_BY_ID_ERROR
            })
        })
}
const removeSelectedTypeEtab=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_TYPEETAB
    })
}

const uploadImageTypeEtab = (imageData) => async dispatch => {
    if (imageData.entries().next().value[1] !== null) {
        const response = await InstanceAxios.post(TYPEETAB_URL + `/image`, imageData );
        dispatch({
            type: UPLOAD_IMAGE_TYPEETAB,
            payload: response.data
        });
    }
}

export {getTypeEtab,saveTypeEtabs,getTypeEtabById,removeSelectedTypeEtab
,updateTypeEtab,uploadImageTypeEtab,getTypeEtabById2} 
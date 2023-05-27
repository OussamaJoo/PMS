import InstanceAxios from "../../InstanceAxios"
import {
    DELETE_USER, DELETE_USER_ERROR, GET_ALL_USER, GET_ALL_USER_ERROR, GET_USER_BYID, GET_USER_BYID_ERROR,
    POST_USER, POST_USER_ERROR, REMOVE_USER_SELECTED, UPDATE_USER, UPDATE_USER_ERROR, UPLOAD_IMAGE_USER
} from "../type/user";
import {ISLOADING,LOADING} from "../type/loading"
import {USER_ROLE_PERMISSION_URL} from "../url"
import { toast } from "react-toastify";


const getUsers=()=>async dispatch=>{
    
    await InstanceAxios.get(USER_ROLE_PERMISSION_URL).then(
        response=>{
           
            dispatch({
                type:GET_ALL_USER,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:GET_ALL_USER_ERROR,
                payload:error
            })
        })
}
const saveUser=(user,navigate)=>async dispatch=>{
    await InstanceAxios.post(USER_ROLE_PERMISSION_URL,user ).then(
        response=>{
            dispatch({
                type:POST_USER,
                payload:response.data
            })
            
           
            navigate('/administration')
            toast.success(`Un  nouvel utilisateur  a été enregistré`,{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:POST_USER_ERROR
            })
        })
}

const saveUser2=(user)=>async dispatch=>{
    await InstanceAxios.post(USER_ROLE_PERMISSION_URL+"users",user ).then(
        response=>{
            dispatch({
                type:POST_USER,
                payload:response.data
            })
           
           
           
        }).catch(error=>{
            dispatch({
                type:POST_USER_ERROR
            })
        })
}

const updateUser=(user,idUser,navigate)=>async dispatch=>{
    await InstanceAxios.put(USER_ROLE_PERMISSION_URL+"/"+idUser,user ).then(
        response=>{
            dispatch({
                type:UPDATE_USER,
                payload:response.data
            })
           
            navigate('/administration/'+idUser) 
            toast.success(`L'utilisateur  a été Modifié`,{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_USER_ERROR
            })
        })
}
const getUserById=articleId=>async dispatch=>{
    await InstanceAxios.get(USER_ROLE_PERMISSION_URL+'/'+articleId).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_USER_BYID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_USER_BYID_ERROR
            })
        })
}

const removeSelectedUser=()=> dispatch =>{
    dispatch({
        type:REMOVE_USER_SELECTED
    })
}

const uploadImageUser = (imageData) => async dispatch => {
    if (imageData.entries().next().value[1] !== null) {
        const response = await InstanceAxios.post(USER_ROLE_PERMISSION_URL + `users/image`, imageData );
        dispatch({
            type: UPLOAD_IMAGE_USER,
            payload: response.data
        });
    }
}

export {getUsers,saveUser,saveUser2,getUserById,removeSelectedUser,updateUser,uploadImageUser} 
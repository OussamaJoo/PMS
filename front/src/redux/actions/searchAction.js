import InstanceAxios from "../../InstanceAxios"
import {GET_SEARCH,GET_SEARCH_ERROR} from "../type/search";
import {ISLOADING,LOADING} from "../type/loading"

import {toast} from "react-toastify"


const getSearch=(order)=>async dispatch=>{
    await InstanceAxios.post('http://localhost:8000/api/dispoResa',order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:GET_SEARCH,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:GET_SEARCH_ERROR,
                payload:error
            })
        })


}

export {getSearch}
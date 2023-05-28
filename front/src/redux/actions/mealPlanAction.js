import InstanceAxios from "../../InstanceAxios"
import {MEALPLAN_ERROR,GET_MEALPLAN,GET_MEALPLAN_BY_ID,
        GET_MEALPLAN_BY_ID_ERROR,SAVE_MEALPLAN,SAVE_MEALPLAN_ERROR,
        REMOVE_SELECTED_MEALPLAN , UPDATE_MEALPLAN_ERROR, UPDATE_MEALPLAN , getMealPlanByIdETab , MEALPLANBYIDETAB_ERROR, GET_ALL_MEALPLAN_BYIDETAB} from "../type/mealPlan";
import {ISLOADING,LOADING} from "../type/loading"
import {MEALPLAN_URL} from "../url"
import {toast} from "react-toastify"


const getMealPlan=()=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/AllMealPlans').then(
        response=>{
            dispatch({
                type:GET_MEALPLAN,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:MEALPLAN_ERROR,
                payload:error
            })
        })
}

const getMealPlanByIdEtab=(mealId)=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/MealPlanByIdEtab/'+mealId).then(
        response=>{
            dispatch({
                type:GET_ALL_MEALPLAN_BYIDETAB,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
            
        }).catch(error=>{
            dispatch({
                type:MEALPLANBYIDETAB_ERROR,
                payload:error
            })
        })
}

const saveMealPlan=(order,navigate)=>async dispatch=>{
    await InstanceAxios.post(MEALPLAN_URL,order, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:SAVE_MEALPLAN,
                payload:response.data
            })
            navigate('/etablissement/mealPlans')
            toast.success("Le Meal Plan a été enregistré",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:SAVE_MEALPLAN_ERROR
            })
        })
}
const updateMealPlan=(order,idOrder,navigate)=>async dispatch=>{
    await InstanceAxios.put(MEALPLAN_URL+'/'+idOrder,order ).then(
        response=>{
            dispatch({
                type:UPDATE_MEALPLAN,
                payload:response.data
            })
           navigate('/etablissement/mealPlan/'+idOrder)
           
           toast.success("Le Meal Plan a été modifié",{position:toast.POSITION.BOTTOM_LEFT})
        }).catch(error=>{
            dispatch({
                type:UPDATE_MEALPLAN_ERROR
            })
        })
}
const getMealPlanById=articleId=>async dispatch=>{
    await InstanceAxios.get('http://localhost:8000/api/MealByID/'+articleId, { withCredentials: false }).then(
        response=>{
            dispatch({
                type:LOADING,
            })
            dispatch({
                type:GET_MEALPLAN_BY_ID,
                payload:response.data
            })
            dispatch({
                type:ISLOADING,
            })
        }).catch(error=>{
            dispatch({
                type:GET_MEALPLAN_BY_ID_ERROR
            })
        })
}


const removeSelectedMealPlan=()=> dispatch =>{
    dispatch({
        type:REMOVE_SELECTED_MEALPLAN
    })
}






export {getMealPlan,saveMealPlan,getMealPlanById,
        removeSelectedMealPlan,updateMealPlan,getMealPlanByIdEtab} 
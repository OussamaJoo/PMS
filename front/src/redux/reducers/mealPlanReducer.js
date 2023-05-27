import { LOGOUT } from "../type/auth";
import {
    MEALPLAN_ERROR, GET_MEALPLAN, GET_MEALPLAN_BY_ID,
    SAVE_MEALPLAN, SAVE_MEALPLAN_ERROR,
    CONFIRMATION_MEALPLAN_BY_ID, CONFIRMATION_MEALPLAN_BY_ID_ERROR, REMOVE_SELECTED_MEALPLAN,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_MEALPLAN, UPDATE_MEALPLAN_ERROR, UPLOAD_PDF_FACTURE , 
    GET_ALL_MEALPLAN_BYIDETAB , MEALPLANBYIDETAB_ERROR
} from "../type/mealPlan";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listMealPlan: [],
    listMealPlanBYIDETAB: [],
    mealPlan: {},
    loading: true
}

const mealPlanReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_MEALPLAN:
            return {
                ...state,
                listMealPlan: action.payload,

            }
        case MEALPLAN_ERROR:
            return {
                ...state,
                error: action.payload,

            }

            case GET_ALL_MEALPLAN_BYIDETAB:
                return {
                    ...state,
                    listMealPlanBYIDETAB: action.payload,
    
                }
            case MEALPLANBYIDETAB_ERROR:
                return {
                    ...state,
                    error: action.payload,
    
                }

        case SAVE_MEALPLAN:
            return {
                ...state,
                listMealPlan: [action.payload, ...state.listMealPlan]
            }
        case SAVE_MEALPLAN_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_MEALPLAN:
            return {
                ...state,
                listMealPlan: [action.payload, ...state.listMealPlan.filter(order => order.id != action.payload.id)],
                mealPlan: action.payload
            }
        case UPDATE_MEALPLAN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_MEALPLAN_BY_ID:
            return {
                ...state,
                mealPlan: action.payload

            }
        case REMOVE_SELECTED_MEALPLAN:
            return {
                ...state,
                mealPlan: {}
            }
        case ISLOADING:
            return {
                ...state,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case CONFIRMATION_MEALPLAN_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_MEALPLAN_BY_ID_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CREATE_FACTURE:
            return {
                ...state
            }
        case CREATE_FACTURE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOGOUT:
            return {
                listMealPlan: [],
                listMealPlanBYIDETAB: [],
                mealPlan: {},
                loading: true
            }
            case UPLOAD_PDF_FACTURE:
            return {
                ...state
                
            };
        default:
            return state;
    }
}

export default mealPlanReducer
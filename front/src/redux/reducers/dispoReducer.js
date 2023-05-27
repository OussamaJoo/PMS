import { LOGOUT } from "../type/auth";
import {
    DISPO_ERROR, GET_DISPO, GET_DISPO_BY_ID,
    GET_DISPO_BY_ID_ERROR, SAVE_DISPO, SAVE_DISPO_ERROR,
    CONFIRMATION_DISPO_BY_ID, CONFIRMATION_DISPO_BY_ID_ERROR, REMOVE_SELECTED_DISPO,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_DISPO, UPDATE_DISPO_ERROR, UPLOAD_PDF_FACTURE
} from "../type/dispo";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listDispo: [],
    dispo: {},
    loading: true
}

const dispoReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_DISPO:
            return {
                ...state,
                listDispo: action.payload,

            }
        case DISPO_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_DISPO:
            return {
                ...state,
                listDispo: [action.payload, ...state.listDispo]
            }
        case SAVE_DISPO_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_DISPO:
            return {
                ...state,
                listDispo: [action.payload, ...state.listDispo.filter(order => order.id != action.payload.id)],
                dispo: action.payload
            }
        case UPDATE_DISPO_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_DISPO_BY_ID:
            return {
                ...state,
                dispo: action.payload

            }
        case REMOVE_SELECTED_DISPO:
            return {
                ...state,
                dispo: {}
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
        case CONFIRMATION_DISPO_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_DISPO_BY_ID_ERROR:
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
                listDispo: [],
                dispo: {},
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

export default dispoReducer
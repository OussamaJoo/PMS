import { LOGOUT } from "../type/auth";
import {
    ETABLISSEMENT_ERROR, GET_ETABLISSEMENT, GET_ETABLISSEMENT_BY_ID,
    GET_ETABLISSEMENT_BY_ID_ERROR, SAVE_ETABLISSEMENT, SAVE_ETABLISSEMENT_ERROR,
    CONFIRMATION_ETABLISSEMENT_BY_ID, CONFIRMATION_ETABLISSEMENT_BY_ID_ERROR, REMOVE_SELECTED_ETABLISSEMENT,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_ETABLISSEMENT, UPDATE_ETABLISSEMENT_ERROR, UPLOAD_PDF_FACTURE
} from "../type/etablissement";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listEtablissement: [],
    etablissement: {},
    loading: true
}

const etablissementReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_ETABLISSEMENT:
            return {
                ...state,
                listEtablissement: action.payload,

            }
        case ETABLISSEMENT_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_ETABLISSEMENT:
            return {
                ...state,
                listEtablissement: [action.payload, ...state.listEtablissement]
            }
        case SAVE_ETABLISSEMENT_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_ETABLISSEMENT:
            return {
                ...state,
                listEtablissement: [action.payload, ...state.listEtablissement.filter(order => order.id != action.payload.id)],
                etablissement: action.payload
            }
        case UPDATE_ETABLISSEMENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_ETABLISSEMENT_BY_ID:
            return {
                ...state,
                etablissement: action.payload

            }
        case REMOVE_SELECTED_ETABLISSEMENT:
            return {
                ...state,
                etablissement: {}
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
        case CONFIRMATION_ETABLISSEMENT_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_ETABLISSEMENT_BY_ID_ERROR:
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
                listEtablissement: [],
                etablissement: {},
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

export default etablissementReducer
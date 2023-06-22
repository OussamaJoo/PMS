import { LOGOUT } from "../type/auth";
import {
    TARIF_ERROR, GET_TARIF, GET_TARIF_BY_ID,
    GET_TARIF_BY_ID_ERROR, SAVE_TARIF, SAVE_TARIF_ERROR,
    CONFIRMATION_TARIF_BY_ID, CONFIRMATION_TARIF_BY_ID_ERROR, REMOVE_SELECTED_TARIF,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_TARIF, UPDATE_TARIF_ERROR, UPLOAD_PDF_FACTURE,
    GET_ALL_TARIF_BY_ID_ETAB,  ALL_TARIF_BY_ID_ETAB_ERROR
} from "../type/tarif";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listTarif: [],
    listTarifByIdEtab: [],
    tarif: {},
    loading: true
}

const tarifReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_TARIF:
            return {
                ...state,
                listTarif: action.payload,

            }
        case TARIF_ERROR:
            return {
                ...state,
                error: action.payload,

            }
        case GET_ALL_TARIF_BY_ID_ETAB:
            return {
                ...state,
                listTarifByIdEtab: action.payload,

            }
        case ALL_TARIF_BY_ID_ETAB_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_TARIF:
            return {
                ...state,
                listTarif: [action.payload, ...state.listTarif]
            }
        case SAVE_TARIF_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_TARIF:
            return {
                ...state,
                listTarif: [action.payload, ...state.listTarif.filter(order => order.id != action.payload.id)],
                tarif: action.payload
            }
        case UPDATE_TARIF_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_TARIF_BY_ID:
            return {
                ...state,
                tarif: action.payload

            }
        case REMOVE_SELECTED_TARIF:
            return {
                ...state,
                tarif: {}
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
        case CONFIRMATION_TARIF_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_TARIF_BY_ID_ERROR:
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
                listTarif: [],
                listTarifByIdEtab: [],
                tarif: {},
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

export default tarifReducer
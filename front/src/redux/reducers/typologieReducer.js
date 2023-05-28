import { LOGOUT } from "../type/auth";
import {
    TYPOLOGIE_ERROR, GET_TYPOLOGIE, GET_TYPOLOGIE_BY_ID,
    GET_TYPOLOGIE_BY_ID_ERROR, SAVE_TYPOLOGIE, SAVE_TYPOLOGIE_ERROR,
    CONFIRMATION_TYPOLOGIE_BY_ID, CONFIRMATION_TYPOLOGIE_BY_ID_ERROR, REMOVE_SELECTED_TYPOLOGIE,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_TYPOLOGIE, UPDATE_TYPOLOGIE_ERROR, UPLOAD_PDF_FACTURE
} from "../type/typologie";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listTypologies: [],
    typologie: {},
    loading: true
}

const typologieReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_TYPOLOGIE:
            return {
                ...state,
                listTypologies: action.payload,

            }
        case TYPOLOGIE_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_TYPOLOGIE:
            return {
                ...state,
                listTypologies: [action.payload, ...state.listTypologies]
            }
        case SAVE_TYPOLOGIE_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_TYPOLOGIE:
            return {
                ...state,
                listTypologies: [action.payload, ...state.listTypologies.filter(order => order.id != action.payload.id)],
                typologie: action.payload
            }
        case UPDATE_TYPOLOGIE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_TYPOLOGIE_BY_ID:
            return {
                ...state,
                typologie: action.payload

            }
        case REMOVE_SELECTED_TYPOLOGIE:
            return {
                ...state,
                typologie: {}
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
        case CONFIRMATION_TYPOLOGIE_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_TYPOLOGIE_BY_ID_ERROR:
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
                listTypologies: [],
                typologie: {},
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

export default typologieReducer
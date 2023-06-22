import { LOGOUT } from "../type/auth";
import {
    CLIENT_ERROR, GET_CLIENT, GET_CLIENT_BY_ID,
    GET_CLIENT_BY_ID_ERROR, SAVE_CLIENT, SAVE_CLIENT_ERROR,
    CONFIRMATION_CLIENT_BY_ID, CONFIRMATION_CLIENT_BY_ID_ERROR, REMOVE_SELECTED_CLIENT,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_CLIENT, UPDATE_CLIENT_ERROR, UPLOAD_PDF_FACTURE
} from "../type/client";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listClient: [],
    client: {},
    loading: true
}

const clientReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_CLIENT:
            return {
                ...state,
                listClient: action.payload,

            }
        case CLIENT_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_CLIENT:
            return {
                ...state,
                listClient: [action.payload, ...state.listClient]
            }
        case SAVE_CLIENT_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_CLIENT:
            return {
                ...state,
                listClient: [action.payload, ...state.listClient.filter(order => order.id != action.payload.id)],
                client: action.payload
            }
        case UPDATE_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_CLIENT_BY_ID:
            return {
                ...state,
                client: action.payload

            }
        case REMOVE_SELECTED_CLIENT:
            return {
                ...state,
                client: {}
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
        case CONFIRMATION_CLIENT_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_CLIENT_BY_ID_ERROR:
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
                listClient: [],
                client: {},
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

export default clientReducer
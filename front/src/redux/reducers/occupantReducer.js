import { LOGOUT } from "../type/auth";
import {
    OCCUPANT_ERROR, GET_OCCUPANT, GET_OCCUPANT_BY_ID,
    GET_OCCUPANT_BY_ID_ERROR, SAVE_OCCUPANT, SAVE_OCCUPANT_ERROR,
    CONFIRMATION_OCCUPANT_BY_ID, CONFIRMATION_OCCUPANT_BY_ID_ERROR, REMOVE_SELECTED_OCCUPANT,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_OCCUPANT, UPDATE_OCCUPANT_ERROR, UPLOAD_PDF_FACTURE
} from "../type/occupant";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listOccupant: [],
    occupant: {},
    loading: true
}

const occupantReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_OCCUPANT:
            return {
                ...state,
                listOccupant: action.payload,

            }
        case OCCUPANT_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_OCCUPANT:
            return {
                ...state,
                listOccupant: [action.payload, ...state.listOccupant]
            }
        case SAVE_OCCUPANT_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_OCCUPANT:
            return {
                ...state,
                listOccupant: [action.payload, ...state.listOccupant.filter(order => order.id != action.payload.id)],
                occupant: action.payload
            }
        case UPDATE_OCCUPANT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_OCCUPANT_BY_ID:
            return {
                ...state,
                occupant: action.payload

            }
        case REMOVE_SELECTED_OCCUPANT:
            return {
                ...state,
                occupant: {}
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
        case CONFIRMATION_OCCUPANT_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_OCCUPANT_BY_ID_ERROR:
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
                listOccupant: [],
                occupant: {},
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

export default occupantReducer
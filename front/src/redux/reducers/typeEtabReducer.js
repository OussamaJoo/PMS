
import { LOGOUT } from "../type/auth";
import {
    TYPEETAB_ERROR,GET_TYPEETAB,GET_TYPEETAB_BY_ID,GET_TYPEETAB_BY_ID_ERROR,
    REMOVE_SELECTED_TYPEETAB,SAVE_TYPEETAB,SAVE_TYPEETAB_ERROR, UPDATE_TYPEETAB,
     UPDATE_TYPEETAB_ERROR,
     UPLOAD_IMAGE_TYPEETAB
} from "../type/typeEtab";
import { ISLOADING, LOADING } from "../type/loading"


const initialeState = {
    listTypes: [],
    typeEtab: {},
    loading: true
}

const typeEtabReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_TYPEETAB:
            return {
                ...state,
                listTypes: action.payload,

            }
        case TYPEETAB_ERROR:
            return {
                ...state,
                error: action.payload,

            }

       case SAVE_TYPEETAB:
            return {
                ...state,
                listTypes: [action.payload, ...state.listTypes],


            }

        case SAVE_TYPEETAB_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case UPDATE_TYPEETAB:
            return {
                ...state,
                listTypes: [action.payload, ...state.listTypes.filter(f => f.id != action.payload.id)],
                typeEtab: action.payload
            }
        case UPDATE_TYPEETAB_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_TYPEETAB_BY_ID:
            return {
                ...state,
                typeEtab: action.payload

            }
        case GET_TYPEETAB_BY_ID_ERROR:
            return {
                ...state,
                error: action.payload

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
        case REMOVE_SELECTED_TYPEETAB:
            return {
                ...state,
                typeEtab: {}
            }
        case UPLOAD_IMAGE_TYPEETAB:
            return {
                ...state,
                image: action.payload
            };
        case LOGOUT:
            return {
                listTypes: [],
                typeEtab: {},
                loading: true
            }

        default:
            return state;
    }
}

export default typeEtabReducer
import {
    DELETE_USER, DELETE_USER_ERROR, GET_ALL_USER, GET_ALL_USER_ERROR, GET_USER_BYID, GET_USER_BYID_ERROR,
    POST_USER, POST_USER_ERROR, REMOVE_USER_SELECTED, UPDATE_USER, UPDATE_USER_ERROR, UPLOAD_IMAGE_USER
} from "../type/user";
import { ISLOADING, LOADING } from "../type/loading"
import { LOGOUT } from "../type/auth";

const initialeState = {
    listUsers: [],
    user: {},
    loading: true,
}

const userReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_ALL_USER:
            return {
                ...state,
                listUsers: action.payload,

            }
        case GET_ALL_USER_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case POST_USER:
            return {
                ...state,
                user: [action.payload],
                listUsers: [action.payload, ...state.listUsers]
            }
        case POST_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_USER_BYID:
            return {
                ...state,
                user: action.payload

            }
        case GET_USER_BYID_ERROR:
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
        case REMOVE_USER_SELECTED:
            return {
                ...state,
                user: {}
            };

        case UPDATE_USER:
            return {
                ...state,
                user: [action.payload],
                listUsers: [action.payload, ...state.user]
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case LOGOUT:
            return {
                listUsers: [],
                user: {},
                loading: true,
            }
            case UPLOAD_IMAGE_USER:
            return {
                ...state,
                image: action.payload
            };

        default:
            return state;
    }
}

export default userReducer
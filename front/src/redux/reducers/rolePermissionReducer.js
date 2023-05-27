import {
    DELETE_ROLE, DELETE_ROLE_ERROR, GET_ALL_PERMISSION, GET_ALL_PERMISSION_ERROR, GET_ALL_ROLE,
    GET_ALL_ROLE_ERROR, GET_ROLE_BYID, GET_ROLE_BYID_ERROR, POST_ROLE, POST_ROLE_ERROR, REMOVE_ROLE_SELECTED,
    UPDATE_ROLE, UPDATE_ROLE_ERROR, ADD_ROLE_TO_PERMISSION, ADD_ROLE_TO_PERMISSION_ERROR
} from "../type/rolePermission";
import { ISLOADING, LOADING } from "../type/loading"
import { LOGOUT } from "../type/auth";

const initialeState = {
    listRoles: [],
    listPermissions: [],
    role: {},
    loading: true,
}

const rolePermissionReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_ALL_ROLE:
            return {
                ...state,
                listRoles: action.payload,

            }
        case GET_ALL_ROLE_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case POST_ROLE:
            return {
                ...state,
                role: [action.payload],
                listRoles: [action.payload, ...state.listRoles]
            }
        case POST_ROLE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_ROLE_BYID:
            return {
                ...state,
                role: action.payload

            }
        case GET_ROLE_BYID_ERROR:
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
        case REMOVE_ROLE_SELECTED:
            return {
                ...state,
                role: {}
            };

        case GET_ALL_PERMISSION:
            return {
                ...state,
                listPermissions: action.payload,

            }
        case GET_ALL_PERMISSION_ERROR:
            return {
                ...state,
                error: action.payload,

            }
        case ADD_ROLE_TO_PERMISSION:
            return {
                ...state
            }
        case ADD_ROLE_TO_PERMISSION_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case LOGOUT:
            return {
                listRoles: [],
                listPermissions: [],
                role: {},
                loading: true,
            }


        default:
            return state;
    }
}

export default rolePermissionReducer
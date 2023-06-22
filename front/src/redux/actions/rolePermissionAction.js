import InstanceAxios from "../../InstanceAxios"
import {
    ADD_ROLE_TO_PERMISSION,
    ADD_ROLE_TO_PERMISSION_ERROR,
    DELETE_ROLE, DELETE_ROLE_ERROR, GET_ALL_PERMISSION, GET_ALL_PERMISSION_ERROR, GET_ALL_ROLE,
    GET_ALL_ROLE_ERROR, GET_ROLE_BYID, GET_ROLE_BYID_ERROR, POST_ROLE, POST_ROLE_ERROR, REMOVE_ROLE_SELECTED,
    UPDATE_ROLE, UPDATE_ROLE_ERROR
} from "../type/rolePermission";
import { ISLOADING, LOADING } from "../type/loading"
import { ROLES_URL } from "../url"
import { toast } from "react-toastify"


const getRoles = () => async dispatch => {
    await InstanceAxios.get(ROLES_URL).then(
        response => {
            dispatch({
                type: GET_ALL_ROLE,
                payload: response.data
            })
            dispatch({
                type: ISLOADING,
            })

        }).catch(error => {
            dispatch({
                type: GET_ALL_ROLE_ERROR,
                payload: error
            })
        })
}
const saveRole = (role,navigate) => async dispatch => {
    await InstanceAxios.post(ROLES_URL, role).then(
        response => {
            dispatch({
                type: POST_ROLE,
                payload: response.data
            })

            navigate('/administration/roles')

            toast.success("Le role a été ajouté", { position: toast.POSITION.BOTTOM_LEFT })
        }).catch(error => {
            dispatch({
                type: POST_ROLE_ERROR
            })
        })
}
const getRoleById = roleId => async dispatch => {
    await InstanceAxios.get(ROLES_URL + "/" + roleId).then(
        response => {
            dispatch({
                type: LOADING,
            })
            dispatch({
                type: GET_ROLE_BYID,
                payload: response.data
            })
            dispatch({
                type: ISLOADING,
            })
        }).catch(error => {
            dispatch({
                type: GET_ROLE_BYID_ERROR
            })
        })
}

const removeSelectedRole = () => dispatch => {
    dispatch({
        type: REMOVE_ROLE_SELECTED
    })
}

const getPermissions = () => async dispatch => {
    await InstanceAxios.get(ROLES_URL + "permissions").then(
        response => {
            dispatch({
                type: GET_ALL_PERMISSION,
                payload: response.data
            })
            dispatch({
                type: ISLOADING,
            })



        }).catch(error => {
            dispatch({
                type: GET_ALL_PERMISSION_ERROR,
                payload: error
            })
        })
}


const addRoleToPermission = form => async dispatch => {
    await InstanceAxios.post(ROLES_URL + "addpermissiontorole", form).then(
        response => {
            dispatch({
                type: ADD_ROLE_TO_PERMISSION,
                payload: response.data
            })
        }).catch(error => {
            dispatch({
                type: ADD_ROLE_TO_PERMISSION_ERROR
            })
        })
}
export { getRoles, saveRole, getRoleById, removeSelectedRole, getPermissions, addRoleToPermission } 
import { SUCCESS_LOGIN, FAIL_LOGIN, LOGOUT } from "../type/auth";
import jwt_decode from "jwt-decode";

const initialeState = {
    IsLogged: false,
    jwt: null,
    BearerToken: null,
    user: {
        username : '',
        id:'',
        nom:''
       
    },user1:{}
  
}

const authReducer = (state = initialeState, action) => {
    switch (action.type) {
        case SUCCESS_LOGIN:
            return {
                ...state,
                IsLogged: true,
                BearerToken: action.payload.token,
                user:  jwt_decode(action.payload.token),
                user1: action.payload
            }
           
        case FAIL_LOGIN:
            return {
                ...state,
                IsLogged: false,
                

            }

        case LOGOUT:
            return {
                IsLogged: false,
                jwt: null,
                BearerToken: null,
                user: {
                    username: '',
                  
                },
                user1: {
                    
                  
                }

            }
        default:
            return state;
    }
}

export default authReducer
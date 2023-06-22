import { LOGOUT } from "../type/auth";
import {
   GET_SEARCH,GET_SEARCH_ERROR
} from "../type/search";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listSearch: [],
    
    loading: true
}

const searchReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_SEARCH:
            return {
                ...state,
                listSearch: action.payload,

            }
        case GET_SEARCH_ERROR:
            return {
                ...state,
                error: action.payload,

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
       
        case LOGOUT:
            return {
                listSearch: [],
           
                loading: true
            }
           
        default:
            return state;
    }
}

export default searchReducer
import { LOGOUT } from "../type/auth";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {

    loading: true
}

const loadingReducer = (state = initialeState, action) => {
    switch (action.type) {

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
                loading: true


            }

        default:
            return state;
    }
}

export default loadingReducer
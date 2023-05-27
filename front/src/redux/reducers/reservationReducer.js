import { LOGOUT } from "../type/auth";
import {
    RESERVATION_ERROR, GET_RESERVATION, GET_RESERVATION_BY_ID,
    GET_RESERVATION_BY_ID_ERROR, SAVE_RESERVATION, SAVE_RESERVATION_ERROR,
    CONFIRMATION_RESERVATION_BY_ID, CONFIRMATION_RESERVATION_BY_ID_ERROR, REMOVE_SELECTED_RESERVATION,
    CREATE_FACTURE, GET_RESERVATION_BY_ID2, CREATE_FACTURE_ERROR, UPDATE_RESERVATION, UPDATE_RESERVATION_ERROR, UPLOAD_PDF_FACTURE
} from "../type/reservation";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listReservation: [],
    reservation: {},
    reservation2: {},
    loading: true
}

const reservationReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_RESERVATION:
            return {
                ...state,
                listReservation: action.payload,

            }
        case RESERVATION_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_RESERVATION:
            return {
                ...state,
                listReservation: [action.payload, ...state.listReservation]
            }
        case SAVE_RESERVATION_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_RESERVATION:
            return {
                ...state,
                listReservation: [action.payload, ...state.listReservation.filter(order => order.id != action.payload.id)],
                reservation: action.payload
            }
        case UPDATE_RESERVATION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_RESERVATION_BY_ID:
            return {
                ...state,
                reservation: action.payload

            }
        case GET_RESERVATION_BY_ID2:
            return {
                ...state,
                reservation2: action.payload

            }
        case REMOVE_SELECTED_RESERVATION:
            return {
                ...state,
                reservation: {}
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
        case CONFIRMATION_RESERVATION_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_RESERVATION_BY_ID_ERROR:
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
                listReservation: [],
                reservation: {},
                reservation2: {},
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

export default reservationReducer
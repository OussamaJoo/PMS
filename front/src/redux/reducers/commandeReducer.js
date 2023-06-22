import { LOGOUT } from "../type/auth";
import {
    COMMANDE_ERROR, GET_COMMANDE, GET_COMMANDE_BY_ID,
    GET_COMMANDE_BY_ID_ERROR, SAVE_COMMANDE, SAVE_COMMANDE_ERROR,
    CONFIRMATION_COMMANDE_BY_ID, CONFIRMATION_COMMANDE_BY_ID_ERROR, REMOVE_SELECTED_COMMANDE,
    CREATE_FACTURE, CREATE_FACTURE_ERROR, UPDATE_COMMANDE, UPDATE_COMMANDE_ERROR, UPLOAD_PDF_FACTURE, 
    GET_COMMANDE_BY_ID_CLIENT, GET_COMMANDE_BY_ID_CLIENT_ERROR ,GET_COMMANDE_BY_ID_ETABLISSEMENT,GET_COMMANDE_BY_ID_ETABLISSEMENT_ERROR
} from "../type/commande";
import { ISLOADING, LOADING } from "../type/loading"

const initialeState = {
    listCommande: [],
    listCommandeByIdClient: [],
    listCommandeByIdEtab: [],
    commande: {},
    loading: true
}

const commandeReducer = (state = initialeState, action) => {
    switch (action.type) {
        case GET_COMMANDE:
            return {
                ...state,
                listCommande: action.payload,

            }
        case COMMANDE_ERROR:
            return {
                ...state,
                error: action.payload,

            }
        case GET_COMMANDE_BY_ID_CLIENT:
            return {
                ...state,
                listCommandeByIdClient: action.payload,

            }
        case GET_COMMANDE_BY_ID_CLIENT_ERROR:
            return {
                ...state,
                error: action.payload,

            }
            case GET_COMMANDE_BY_ID_ETABLISSEMENT:
            return {
                ...state,
                listCommandeByIdEtab: action.payload,

            }
        case GET_COMMANDE_BY_ID_ETABLISSEMENT_ERROR:
            return {
                ...state,
                error: action.payload,

            }

        case SAVE_COMMANDE:
            return {
                ...state,
                listCommande: [action.payload, ...state.listCommande]
            }
        case SAVE_COMMANDE_ERROR:
            return {
                ...state,
                errorSave: action.payload
            }
        case UPDATE_COMMANDE:
            return {
                ...state,
                listCommande: [action.payload, ...state.listCommande.filter(order => order.id != action.payload.id)],
                commande: action.payload
            }
        case UPDATE_COMMANDE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_COMMANDE_BY_ID:
            return {
                ...state,
                commande: action.payload

            }
        case REMOVE_SELECTED_COMMANDE:
            return {
                ...state,
                commande: {}
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
        case CONFIRMATION_COMMANDE_BY_ID:
            return {
                ...state
            }
        case CONFIRMATION_COMMANDE_BY_ID_ERROR:
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
                listCommande: [],
                listCommandeByIdClient: [],
                listCommandeByIdEtab: [],
                commande: {},
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

export default commandeReducer
import { combineReducers } from "redux";

import typeEtabReducer from "./typeEtabReducer"
import etablissementReducer from "./etablissementReducer"
import typologieReducer from "./typologieReducer"
import dispoReducer from "./dispoReducer"
import tarifReducer from "./tarifReducer"
import mealPlanReducer from "./mealPlanReducer"
import reservationReducer from "./reservationReducer";
import occupantReducer from "./occupantReducer";
import searchReducer from "./searchReducer";
import clientReducer from "./clientReducer";
import commandeReducer from "./commandeReducer";

import authReducer from "./authReducer";
import userReducer from "./userReducer"
import rolePermissionReducer from "./rolePermissionReducer"
import loadingReducer from "./loadingReducer"

export default combineReducers({
    authReducer:authReducer,
    userReducer:userReducer,
    rolePermissionReducer:rolePermissionReducer,
    loadingReducer:loadingReducer,
    typeEtabReducer:typeEtabReducer,
    etablissementReducer:etablissementReducer,
    typologieReducer:typologieReducer,
    dispoReducer:dispoReducer,
    tarifReducer:tarifReducer,
    mealPlanReducer:mealPlanReducer,
    reservationReducer:reservationReducer,
    occupantReducer:occupantReducer,
    searchReducer:searchReducer,
    clientReducer:clientReducer,
    commandeReducer:commandeReducer,
    
    
})
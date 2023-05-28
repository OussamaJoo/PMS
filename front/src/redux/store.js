import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfi={
    key:'main-root',
    storage
}

const perstitedReducer=persistReducer(persistConfi,rootReducer)
const initialeState={}
const middleware=[thunk] 
const store =createStore(perstitedReducer,
    composeWithDevTools(applyMiddleware(...middleware)))

const Persistor=persistStore(store)
export {Persistor}
export default store

import {ISLOADING,LOADING} from "../type/loading"



const loadingComponent=()=> dispatch=>{
    
            dispatch({
                type:LOADING,
                
            })
            
}
const ComponentIsLoaded=()=> dispatch=>{
    
            dispatch({
                type:ISLOADING
            })
         
}


export {loadingComponent,ComponentIsLoaded} 
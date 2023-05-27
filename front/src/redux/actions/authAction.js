import InstanceAxios from "../../InstanceAxios"
import { SUCCESS_LOGIN,FAIL_LOGIN, LOGOUT } from "../type/auth";
import {LOGIN_URL} from "../url"
import {toast} from "react-toastify"
import axios from "axios";


const SignIn=(user,navigate)=>async dispatch=>{

  InstanceAxios
  .post(`http://127.0.0.1:8000/api/login`, user)
  .then((res) => {
   
     dispatch({
      type:SUCCESS_LOGIN,
      payload:res.data
      
  })

  localStorage.setItem('token',res.data.token)


  if(res.data.roles[0]==='ROLE_ADMIN'){
    navigate('/administration')
  }else{
    navigate('/etablissement/etablissements')
  }
            

  })
  .catch(error=>{
    dispatch({
        type:FAIL_LOGIN
       
    })
    toast.error("Username or Password incorrect",{position:toast.POSITION.BOTTOM_LEFT})
  });


    
}

const LoGouT=()=> dispatch=>{
    localStorage.removeItem('token')
    
    dispatch({
        type:LOGOUT
    })
    
}





export {SignIn,LoGouT} 
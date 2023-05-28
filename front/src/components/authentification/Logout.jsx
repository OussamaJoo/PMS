import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoGouT } from '../../redux/actions/authAction'

const Logout = () => {
    const auth = useSelector((state) => state.authReducer)
    const { IsLogged } = auth
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOUT=(e)=>{
        e.preventDefault()
        dispatch(LoGouT())
        navigate('/login')
    }
  return (
    <li className="nav-item">
                <button className="btn btn-white nav-link" onClick={e=>{logOUT(e)}}>Logout</button>
            </li>
  )
}

export default Logout
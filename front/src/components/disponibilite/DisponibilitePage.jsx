import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarDisponibilite from './TopBarDisponibilite'

const DisponibilitePage = () => {
  //get data
  return (
    <div>
        <TopBarDisponibilite/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default DisponibilitePage
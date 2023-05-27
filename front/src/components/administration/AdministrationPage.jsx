import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarAdministration from './TopBarAdministration'



const AdministrationPage = () => {
  //get data
  return (
    <div>
        <TopBarAdministration/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AdministrationPage
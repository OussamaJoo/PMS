import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarClient from './TopBarClient'

const ClientPage = () => {
  //get data
  return (
    <div>
        <TopBarClient/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default ClientPage
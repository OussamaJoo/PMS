import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarResp from './TopBarResp'

const RespPage = () => {
  //get data
  return (
    <div>
        <TopBarResp/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RespPage
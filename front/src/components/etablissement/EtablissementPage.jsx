import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarEtablissement from './TopBarEtablissemnet'

const EtablissementPage = () => {
  //get data
  return (
    <div>
        <TopBarEtablissement/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default EtablissementPage
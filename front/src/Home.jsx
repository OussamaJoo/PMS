import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SideBar from './SideBar'
import TopBar from './TopBar'

const Home = () => {
  return (
    <div>
      <TopBar/>
      <SideBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home
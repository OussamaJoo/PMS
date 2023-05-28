import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'
import SideBar from './SideBar'

import TopBarReservation from './TopBarReservation'

const ReservationPage = () => {
  //get data
  return (
    <div>
        <TopBarReservation/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default ReservationPage
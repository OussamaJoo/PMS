import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const auth = useSelector((state) => state.authReducer)
    const { user } = auth
    

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4"  style={{backgroundColor:"#002060"}}>
                {/* Brand Logo */}
                <a className="brand-link">
                
                    <img src={ process.env.PUBLIC_URL+"/dist/img/AdminLTELogo.png"} className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">SAS-LAB PMS </span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                        <img src={ process.env.PUBLIC_URL+"/dist/img/user2-160x160.jpg"} className="img-circle elevation-2" />
                        </div>
                        <div className="info">
                            <p  className="d-block text-white">{user.username}</p>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library */}
                           
                             <li className="nav-item has-treeview ">

                                <Link className='nav-link ' to={'/'}>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p> Dashboard </p>
                                </Link>

                            </li>
                           
                         
                                    
                                    <li className="nav-item">
                                        <Link className='nav-link active' to={'/client/commandes'}>
                                            <i class="nav-icon fa-solid fa-pen-to-square"></i>
                                            <p>Commande</p>
                                        </Link>
                                    </li>

                            
                        </ul>
                    </nav>
                    
                </div>
               
            </aside>
        </div>
    )
}

export default SideBar
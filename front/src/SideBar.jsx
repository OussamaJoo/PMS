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
                    <span className="brand-text font-weight-light">SASLAB-PMS </span>
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
                            
                           
                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link">
                                <i class="nav-icon fa-solid fa-city"></i>
                              
                                    <p>
                                        Etablissement
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    
                                <li className="nav-item">
                                        <Link className='nav-link' to={'/etablissement/etablissements'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Etablissement </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/etablissement/types'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Type </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/etablissement/typologies'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Typologie </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/etablissement/mealPlans'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> MealPlan </p>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/etablissement/clients'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Client </p>
                                        </Link>
                                    </li>
                                   
                                    

                                </ul>
                            </li>


                          

                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link  ">
                                <i class="nav-icon fa-solid fa-calendar-check"></i>
                                    <p>
                                        Disponibilité
                                        <i className="fas fa-angle-left right" />
                                        
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    
                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/disponibilite/disponibilites'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Disponibilité </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/disponibilite/tarifs'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Tarif </p>
                                        </Link>
                                    </li>

                                   
                                </ul>
                            </li>


                            <li className="nav-item has-treeview">
                                <a href="#" className="nav-link">
                                <i class="nav-icon fa-solid fa-pen-to-square"></i>
                                    <p>
                                        Reservation
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">

                                <li className="nav-item">
                                        <Link className='nav-link' to={'/reservation/searchResa'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Search Resa </p>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link className='nav-link' to={'/reservation/reservations'}>
                                            <i class="far fa-circle nav-icon"></i>
                                            <p> Reservation </p>
                                        </Link>
                                    </li>

                                    
                                    

                                </ul>
                            </li>
                           
                            <li className="nav-item has-treeview ">

                                <Link className='nav-link active' to={'/administration'}>
                                    <i className="nav-icon fas fa-users" />
                                    <p> Gestion des utilisateurs </p>
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
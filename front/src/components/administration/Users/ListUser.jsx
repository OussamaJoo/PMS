import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../redux/actions/userAction';
import { Link } from 'react-router-dom';


const ListUser = () => {

    const userReducer = useSelector((state) => state.userReducer)
  const { listUsers, error, loading } = userReducer
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    
  }, [dispatch])
  return (
    <div className="content-wrapper">

    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Liste des utilisateurs</h1>
          </div>
          
        </div>
      </div>
    </div>
  
    <section className="content">
      <div className="container-fluid">
     
      
        <div className="row">
            {listUsers.map(user=>
               
          <div className="col-lg-4 col-6">
            
            <div className={user.roles?.roleName==='ROLE_ADMIN' ? "small-box bg-success" : "small-box bg-info"}>
              <div className="inner">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <small>{user.roles?.roleName}</small>
              </div>
              <div className="icon">
                <i className="ion ion-person" />
              </div>
              
              <Link className="small-box-footer" to={'/administration/users/'+user.id}>More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
          </div>
           )}
           

            
         {/* <div className="col-lg-3 col-6">
           
            <div className="small-box bg-success">
              <div className="inner">
                <h3>53<sup style={{fontSize: 20}}></sup></h3>
                <p>En cours</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
         
          <div className="col-lg-3 col-6">
            
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>
                <p>Annulé</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
         
          <div className="col-lg-3 col-6">
           
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>
                <p>Total</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>*/} 
          
        </div>
        
      </div>
    </section>
    
  </div>
  )
}

export default ListUser
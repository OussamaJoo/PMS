import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../../redux/actions/userAction'
import { getRoles, getRoleById } from '../../../redux/actions/rolePermissionAction'
import "../../globalComponenet/LoadingSpinner.css"
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { getEtablissement } from '../../../redux/actions/etablissementAction'
import { getTypeEtab } from '../../../redux/actions/typeEtabAction';
import { getMealPlan } from '../../../redux/actions/mealPlanAction';
import { getTypologie } from '../../../redux/actions/typologieAction';
import { getDispo } from '../../../redux/actions/dispoAction';
import { getTarif } from '../../../redux/actions/tarifAction';
import { getClient } from '../../../redux/actions/clientAction';



const DashboardAdministrateur = () => {

  const users = useSelector((state) => state.userReducer)
  const { listUsers, error, loading } = users

  const rolePermissionReducer = useSelector((state) => state.rolePermissionReducer)
  const { listRoles, } = rolePermissionReducer


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getRoles())
    dispatch(getEtablissement())
    dispatch(getTypeEtab())
    dispatch(getMealPlan())
    dispatch(getTypologie())
    dispatch(getDispo())
    dispatch(getTarif())
    dispatch(getClient())
  }, [dispatch])

  const titre = "Users"
  const lienToAdd = "/stock/addarticle"
  const lienDetail = "/stock/article/"

  const detail = (idUser) => {
    navigate('/administration/users/' + idUser)
  }
  const detailRole = (e, idRole) => {
    e.preventDefault()
    navigate('/administration/roles/' + idRole)
  }



  return (

    <div className="content-wrapper" style={{ minHeight: "573px;" }}>

      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Gestion des utilisateurs</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">

              </ol>
            </div>
          </div>
        </div>
      </div>



      <section className="content">
        <div className="container-fluid">

          <div className="row">

            <div className="col-md-8">

              <div className="card">
                <div className="card-header border-transparent">
                  <h3 className="card-title">Liste des utilisateurs</h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Prenom</th>
                          <th>Email</th>
                          <th>Telephone</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listUsers.filter((user, index) => (index < 6))
                          .map(user =>
                            <tr onClick={() => detail(user.id)}>
                              <td>{user.nom}</td>
                              <td>{user.prenom}</td>
                              <td>{user.email}</td>
                              <td>{user.telephone}</td>
                              <td><span className="badge badge-success">{listRoles.filter(j => user.role == "/api/roles/" + j.id).map(f => <p>{f.roleName}</p>)}</span></td>

                            </tr>
                          )}


                      </tbody>
                    </table>



                  </div>

                </div>

                <div className="card-footer clearfix">

                  <Link className="btn btn-sm btn-info float-left" to={'/administration/adduser'}>Nouvel utilisateur</Link>
                  <Link className="btn btn-sm btn-secondary float-right" to={'/administration/users'}>Voir tous les utilisateurs</Link>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Liste des roles</h3>

                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                      <i className="fas fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="card-body p-0">
                  <ul className="products-list product-list-in-card pl-2 pr-2">
                    {listRoles.filter((role, index) => (index < 9))
                      .map(role =>

                        <li onClick={e => detailRole(e, role.id)} className="item">
                          <div className="product-img">
                            <Stack direction="row" spacing={2}>

                              <Avatar sx={{ bgcolor: deepPurple[500] }}>{role.roleName[5]}</Avatar>
                            </Stack>
                          </div>
                          <div className="product-info">
                            <a href="javascript:void(0)" className="product-title">{role.roleName}
                            </a>

                          </div>
                        </li>
                      )}


                  </ul>
                </div>


                <div className="card-footer text-center">
                  <Link className="btn btn-sm btn-info float-left" to={'/administration/addrole'}>Nouvel role</Link>
                  <Link className="btn btn-sm btn-secondary float-right" to={'/administration/roles'}>Voir tous les rôles</Link>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>

  )
}

export default DashboardAdministrateur
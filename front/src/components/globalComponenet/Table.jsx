import React, { useEffect } from 'react'
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import { useNavigate, Link } from "react-router-dom";

const Table = ({ columns, data, titre, lienToAdd, lienDetail }) => {
  const props = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 }
    },
    useGlobalFilter, // useGlobalFilter!

    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = props;
  //console.log(props);
  useEffect(() => {
    // props.dispatch({ type: actions.resetPage })
  }, [globalFilter]);
  const navigate = useNavigate()
  const detail = (idArticle) => {
    if(lienDetail!=null){
      navigate(lienDetail + idArticle)
    }
  }
  return (
    <>


      <div className='card container'>
        {/* card header */}
        <div className='card-header h-25 bg-light '>
          
          <div className="row mb-2">
            <div className="col-sm-6">
              <h5>{titre}</h5>
              {lienToAdd != null ? (
                  <Link className='btn bg-olive' to={lienToAdd}>Créer</Link>
      ) : (
        <div></div>
      )}
              
            </div>
            <div className="col-sm-6">

              <input
                className="form-control  form-control-border form-control-sm bg-light"
                placeholder="Search ..."
                type="text"
                value={globalFilter || ""}
                onChange={e => setGlobalFilter(e.target.value)}
              />
              <ul className="pagination justify-content-end">
                <span>
                  <strong>
                    {pageIndex + 1}/{pageOptions.length}
                  </strong>
                </span>
                <a style={{ backgroundColor: "transparent" }} onClick={() => previousPage()} disabled={!canPreviousPage} className="border-0 page-link" ><i className="fa-solid fa-angle-left"></i></a>
                <a style={{ backgroundColor: "transparent" }} onClick={() => nextPage()} disabled={!canNextPage} className="border-0 page-link" ><i className="fa-solid fa-angle-right"></i></a>
                <div>
                  <select
                    className='form-control form-control-sm '
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 15, 20].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </ul>
            </div>
          </div>

        </div>
        
        {data.length<=0 ? <h3 className='text-center'>La liste est vide</h3> : 
        <div className='card-body '>
          <table className="table align-middle  mb-0 bg-white  table-hover table-sm"  {...getTableProps()} style={{ cursor: 'pointer' }}>
            <thead className='bg-wight'>
              {headerGroups.map(headerGroup => (
                <tr  {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? '↑' : '↓') : ''}
                      </span>
                      {/* Render the columns filter UI */}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr onClick={() => detail(row.original.id)} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}

                  </tr>

                );
              })}
            </tbody>
          </table>

        </div>
        }
      </div>
      

    </>
  );
}

export default Table
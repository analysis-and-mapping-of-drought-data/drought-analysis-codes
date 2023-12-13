import axios from "axios";
import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useTable , usePagination } from 'react-table';

function Baraj() {
    
    const [data, setData] = useState([]);

    const columns = useMemo(
      () => [
        {
          Header:"#",
          accessor:"index"
        },
        {
          Header: "Baraj",
          accessor: "baraj_adi",
        },
        {
          Header: "2010",
          accessor: "yil_2010",
        },
        {
          Header: "2011",
          accessor: "yil_2011",
        },
        {
          Header: "2012",
          accessor: "yil_2012",
        },
        {
          Header: "2013",
          accessor: "yil_2013",
        },
        {
          Header: "2014",
          accessor: "yil_2014",
        },
        {
          Header: "2015",
          accessor: "yil_2015",
        },
        {
          Header: "2016",
          accessor: "yil_2016",
        },
        {
          Header: "2017",
          accessor: "yil_2017",
        },
        {
          Header: "2018",
          accessor: "yil_2018",
        },
        {
          Header: "2019",
          accessor: "yil_2019",
        },
        {
          Header: "2020",
          accessor: "yil_2020",
        },
        {
          Header: "2021",
          accessor: "yil_2021",
        },{
          Header:"Detay",
          accessor:"detay",
          Cell:({row})=>(
            <button className="btn btn-primary">Detay</button>
          )
        }
      ],
      []
    );
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns, // Change 'column' to 'columns'
        data,
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      usePagination
    );
  
    useEffect(() => {
      axios.get('http://localhost:3001/baraj/year')
        .then(res => {
          const indexedData = res.data.map((item, index) => ({ ...item, index: index + 1 }));
          setData(indexedData); // res.data içinde doğrudan barajlar bulunuyor.
        })
        .catch(err => console.log(err));
    }, []);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Barajs</h6>
        </div>
        <div className="table-responsive">
          <table {...getTableProps()} className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((columns) => (
                    <th {...columns.getHeaderProps()}>{columns.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-3">
            <button className="btn btn-secondary" onClick={()=>previousPage()} disabled={!canPreviousPage}>Prev</button>
            <button className="btn btn-secondary" onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
          </div>
          <div>
              Page {pageIndex + 1} of {pageOptions.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Baraj;

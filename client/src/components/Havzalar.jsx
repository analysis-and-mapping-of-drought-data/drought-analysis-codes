
import React, { useEffect, useState, useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Havzalar() {
  const [data, setData] = useState([]);
  const [selectedHavza, setSelectedHavza] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'Havza Adı',
        accessor: 'havza_adi',
      },
      {
        Header: 'Yıl',
        accessor: 'havza_yil',
      },
      {
        Header: 'Baraj',
        accessor: 'havza_baraj',
      },
      {
        Header: 'Yağış',
        accessor: 'havza_yagis',
      },
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
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    axios
      .get('http://localhost:3001/havza/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChartButtonClick = (row) => {
    setSelectedHavza(row.original);
    setShowModal(true);
   
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div>
          <div className="table-responsive">
            <table
              {...getTableProps()}
              className="table text-start align-middle table-bordered table-hover mb-0"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((columns) => (
                      <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                        {columns.render('Header')}
                        <span>
                          {columns.isSorted ? (columns.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row.id} {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td key={cell.column.id}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Prev
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </div>
            <div>
              Page {pageIndex + 1} of {pageOptions.length}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detaylar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Havzalar;
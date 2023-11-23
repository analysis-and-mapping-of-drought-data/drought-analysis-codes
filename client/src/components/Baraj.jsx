import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function Baraj() {
    
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3001/api/barajlar')
        .then(res => {
          console.log(res);
          setData(res.data); // res.data içinde doğrudan barajlar bulunuyor.
        })
        .catch(err => console.log(err));
    }, []);
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/api/barajlar/${id}`)
        .then(res => {
          console.log(res);
          // Silme işlemi başarıyla tamamlandığında sayfayı yenileme
          setData(prevData => prevData.filter(user => user._id !== id));
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Barajs</h6>
          <Link to="/create" className="btn btn-success btn-sm">Add +</Link>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-white">
                <th scope="col">Baraj</th>
                <th scope="col">il</th>
                <th scope="col">2010</th>
                <th scope="col">2011</th>
                <th scope="col">2012</th>
                <th scope="col">2013</th>
                <th scope="col">2014</th>
                <th scope="col">2015</th>
                <th scope="col">2016</th>
                <th scope="col">2017</th>
                <th scope="col">2018</th>
                <th scope="col">2019</th>
                <th scope="col">2020</th>
                <th scope="col">2021</th>
              </tr>
            </thead>
            <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.il}</td>
                <td>{user.yil_2010}</td>
                <td>{user.yil_2011}</td>
                <td>{user.yil_2012}</td>
                <td>{user.yil_2013}</td>
                <td>{user.yil_2014}</td>
                <td>{user.yil_2015}</td>
                <td>{user.yil_2016}</td>
                <td>{user.yil_2017}</td>
                <td>{user.yil_2018}</td>
                <td>{user.yil_2019}</td>
                <td>{user.yil_2020}</td>
                <td>{user.yil_2021}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
             ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Baraj;

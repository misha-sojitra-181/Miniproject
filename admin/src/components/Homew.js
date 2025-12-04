import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Homew.css';   // <-- ADD THIS

function Homew() {
  const [wifi, setWifi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/tblwifi')
      .then(res => setWifi(res.data))
      .catch(err => console.error("Error in plans:", err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this plan?");
    if (confirm) {
      axios.delete(`http://localhost:3001/tblwifi/${id}`)
        .then(() => {
          alert("Plan deleted successfully");
          navigate('/Homew');
        }
      )
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="homew-wrapper">
      
      {/* TITLE */}
      <div className="homew-title">
        <i className="fa-solid fa-wifi"></i>
        <h1>Wifi Plans </h1>
      </div>

      <div className="homew-container">

        {/* ADD BUTTON */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/createw" className="add-btn">+ Add Plan</Link>
        </div>

        {wifi.length === 0 ? (
          <div className='alert alert-info text-center'>No plans available.</div>
        ) : (

          <div className='table-responsive'>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Plan Name</th>
                  <th>Data</th>
                  <th>Amount</th>
                  <th>Validity</th>
                  <th>Description</th>
                  <th colspan='3'>Action</th>
                </tr>
              </thead>

              <tbody>
                {wifi.map(wifi => (
                  <tr key={wifi.wifiid}>
                    <td>{wifi.wifiid}</td>
                    <td>{wifi.plan_name}</td>
                    <td>{wifi.data}</td>
                    <td>₹ {wifi.amount}</td>
                    <td>{wifi.validity}</td>
                    <td>{wifi.description}</td>

                    <td><Link className="btn-view" to={`/readw/${wifi.wifiid}`}>View</Link></td>
                      <td><Link className="btn-edit" to={`/updatew/${wifi.id}`}>Update</Link></td>
                      <td><button className="btn-delete" onClick={() => handleDelete(wifi.id)}>Delete</button></td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default Homew;

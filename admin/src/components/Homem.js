import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Homem.css';   

function Homem() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/tblplan')
      .then(res => setPlans(res.data))
      .catch(err => console.error("Error in plans:", err));
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this plan?");
    if (confirm) {
      axios.delete(`http://localhost:3001/tblplan/${id}`)
        .then(() => {
          alert("Plan deleted successfully");
          navigate('/Homem');
        }
      
      )
        
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="homem-wrapper">
      
      
      <div className="homem-title">
        <i className="fa-solid fa-mobile-screen"></i>
        <h1>Mobile Plans </h1>
      </div>

      <div className="homem-container">

        
        <div className="d-flex justify-content-end mb-3">
          <Link to="/createm" className="add-btn">+ Add Plan</Link>
        </div>

        {plans.length === 0 ? (
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
                {plans.map(plan => (
                  <tr key={plan.planid}>
                    <td>{plan.planid}</td>
                    <td>{plan.plan_name}</td>
                    <td>{plan.Data}</td>
                    <td>₹ {plan.amount}</td>
                    <td>{plan.validity}</td>
                    <td>{plan.description}</td>

                    <td><Link className="btn-view" to={`/readm/${plan.planid}`}>View</Link></td>
                      <td><Link className="btn-edit" to={`/updatem/${plan.id}`}>Update</Link></td>
                      <td><button className="btn-delete" onClick={() => handleDelete(plan.id)}>Delete</button></td>

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

export default Homem;

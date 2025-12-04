import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
  axios.get(`http://localhost:3001/tblwifi?wifiid=${id}`)
    .then(res => {
      if (res.data.length > 0) {
        setData(res.data[0]);
      } else {
        console.log("Plan not found");
      }
    })
    .catch(err => console.log(err));
}, [id]);

  return (
    <div className="d-flex w-100 min-vh-100 justify-content-center align-items-center bg-light p-4">
   
      <div className="card shadow-lg p-3" style={{ maxWidth: '600px', width: '100%', borderRadius: '15px' }}>
         <div className="card-header bg-primary text-white text-center py-3" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
          <h3 className="mb-0 fs-4">Wifi Plan Details </h3>
        </div>

        <div className="card-body">
          <div className="row g-3"> 
            
            <div className="col-12">
              <div className="alert alert-info py-2 mb-0">
                <p className="mb-0">
                  <span className="fw-bold me-2">Plan Name:</span> 
                  <span className="text-dark">{data.plan_name || 'Loading...'}</span>
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <PlanDetail label="Data Limit" value={data.data}  />
            </div>
            
            <div className="col-md-6">
              <PlanDetail label="Amount" value={data.amount} />
            </div>

            <div className="col-md-6">
              <PlanDetail label="Validity" value={data.validity} />
            </div>

            <div className="col-md-6">
              <PlanDetail label="ID" value={id}/>
            </div>

            <div className="col-12 mt-4">
              <h5 className="text-secondary border-bottom pb-1">Description</h5>
              <p className="text-muted bg-light p-3 rounded">{data.description}</p>
            </div>

          </div>
        </div>

          <div className="card-footer text-center bg-white border-0 ">
              <Link to="/Homew" className="btn btn-dark px-4 shadow-sm">
                  <i className="bi bi-arrow-left "></i> Back
              </Link>
          </div>
      </div>

    </div>
  );
};


const PlanDetail = ({ label, value}) => (
  <div className="p-3 bg-light rounded h-100 d-flex flex-column justify-content-between">
    <small className="text-muted fw-semibold">{label}</small>
    <div className="d-flex align-items-center mt-1">
    
      <strong className="fs-5 text-dark">
        {value} 
      </strong>
    </div>
  </div>
);

export default Read;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const [values, setValues] = useState({
    planid:"",
    plan_name: "",
    Data: "",
    amount: "",
    validity: "",
    description: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tblplan/${id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/tblplan/${id}`, values)
      .then(() => navigate("/Homem"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f3f5ff",
        padding: "20px"}}>
      <div
        className="shadow-lg"
        style={{
          width: "600px",
          background: "white",
          borderRadius: "18px",
          overflow: "hidden"}}>
        
        <div
          style={{
            background: "linear-gradient(135deg, #007bff, #6610f2)",
            padding: "25px 10px",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"}}>
          <h2
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "700",
              letterSpacing: "0.5px" }}>Update Mobile Plan </h2>
        </div>

       
        <form onSubmit={handleUpdate} style={{ padding: "30px" }}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Plan Id</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.planid}
              onChange={(e) =>
                setValues({ ...values, planid: e.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Plan Name</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.plan_name}
              onChange={(e) =>
                setValues({ ...values, plan_name: e.target.value })}/>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Data</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.Data}
              onChange={(e) =>
                setValues({ ...values, Data: e.target.value })} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Amount</label>
            <input
              type="number"
              className="form-control modern-input"
              value={values.amount}
              onChange={(e) =>
                setValues({ ...values, amount: e.target.value })} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Validity</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.validity}
              onChange={(e) =>
                setValues({ ...values, validity: e.target.value }) }/>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              rows="3"
              className="form-control modern-input"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value }) } ></textarea>
          </div>

         
          <div className="d-flex justify-content-between">
            <button
              className="btn"
              style={{
                background: "linear-gradient(135deg, #11998e, #38ef7d)",
                color: "white",
                fontWeight: "600",
                padding: "10px 28px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px"
              }}> Update </button>

            <Link
              to="/Homem"
              className="btn"
              style={{
                background: "linear-gradient(135deg, #ff512f, #dd2476)",
                color: "white",
                fontWeight: "600",
                padding: "10px 28px",
                borderRadius: "10px",
                fontSize: "16px"
              }}>  Back</Link>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default Update;

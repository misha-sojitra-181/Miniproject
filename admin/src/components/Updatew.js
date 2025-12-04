import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    wifiid:"",
    plan_name: "",
    data: "",
    amount: "",
    validity: "",
    description: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/tblwifi/${id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/tblwifi/${id}`, values)
      .then(() => navigate("/Homew"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f5f7ff",
        padding: "20px"
      }}>
      <div
        className="shadow-lg"
        style={{
          width: "600px",
          background: "white",
          borderRadius: "18px",
          overflow: "hidden"
        }}>
        <div
          style={{
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            padding: "25px 10px",
            textAlign: "center",
            color: "white",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }}>
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "1px"
            }}>Update WiFi Plan</h2> </div>

        <form onSubmit={handleUpdate} style={{ padding: "30px" }}>
           <div className="mb-3">
            <label className="form-label fw-semibold">Plan Id</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.wifiid}
              onChange={(e) =>
                setValues({ ...values, wifiid: e.target.value })
              } /></div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Plan Name</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.plan_name}
              onChange={(e) =>
                setValues({ ...values, plan_name: e.target.value })
              } /></div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Data</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.data}
              onChange={(e) => setValues({ ...values, data: e.target.value })}/></div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Amount</label>
            <input
              type="number"
              className="form-control modern-input"
              value={values.amount}
              onChange={(e) => setValues({ ...values, amount: e.target.value })}/> </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Validity</label>
            <input
              type="text"
              className="form-control modern-input"
              value={values.validity}
              onChange={(e) =>
                setValues({ ...values, validity: e.target.value })
              }/></div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              rows="3"
              className="form-control modern-input"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }></textarea>
          </div>

          {/* Buttons */}
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
                fontSize: "16px"}}>Update</button>

            <Link
              to="/Homew"
              className="btn"
              style={{
                background: "linear-gradient(135deg, #ff512f, #dd2476)",
                color: "white",
                fontWeight: "600",
                padding: "10px 28px",
                borderRadius: "10px",
                fontSize: "16px"}} > Back</Link>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default Update;

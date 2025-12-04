import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    tblplan: [],
    tblwifi: [],
    tblregister: [],
    tblpayment: [],
    tblwifipayment: [],
  });

  const totalMobilePayment = data.tblpayment.reduce((sum, item) => {
  return sum + Number(item.amount); // Change "amount" if your field name is different
}, 0);

const totalWifiPayment = data.tblwifipayment.reduce((sum, item) => {
  return sum + Number(item.amount);
}, 0);


  useEffect(() => {
    async function fetchData() {
      try {
        const [plans, wifi, register, payment, wifipayment] = await Promise.all([
          axios.get("http://localhost:3001/tblplan"),
          axios.get("http://localhost:3001/tblwifi"),
          axios.get("http://localhost:3001/tblregister"),
          axios.get("http://localhost:3001/tblpayment"),
          axios.get("http://localhost:3001/tblwifipayment"),
        ]);

        setData({
          tblplan: plans.data,
          tblwifi: wifi.data,
          tblregister: register.data,
          tblpayment: payment.data,
          tblwifipayment: wifipayment.data,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="main-content">
      <div className="title">
        <i className="fa-solid fa-grip"></i>
        <h2>Dashboard</h2>
      </div>

  
      <div className="card-container">
        <div className="card-box plans">
          <i className="fa-solid fa-mobile-screen fa-2x"></i>
          <p><b>Total Mobile Plans</b></p>
          <h3>{data.tblplan.length}</h3>
        </div>

        <div className="card-box wifi">
          <i className="fa-solid fa-wifi fa-2x"></i>
          <p><b>Total WiFi Plans</b></p>
          <h3>{data.tblwifi.length}</h3>
        </div>

        <div className="card-box requests">
          <i className="fa-solid fa-user-plus fa-2x"></i>
          <p><b>Total User Requests</b></p>
          <h3>{data.tblregister.length}</h3>
        </div>
      </div>

      {/* Second Row */}
      <div className="card-container">
        <div className="card-box mprofit">
          <i className="fa-solid fa-money-bill-trend-up fa-2x"></i>
          <p><b>Mobile Payments</b></p>
          <h3>₹{totalMobilePayment}</h3>

        </div>

        <div className="card-box wprofit">
          <i className="fa-solid fa-indian-rupee-sign"></i>
          <p><b>WiFi Payments</b></p>
          <h3>₹{totalWifiPayment}</h3>

        </div>

        <div className="card-box feedback">
          <i className="fa-solid fa-comments fa-2x"></i>
          <p><b>Feedbacks</b></p>
          <h3>{data.tblregister.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import './user.css'; 

const WifiPay = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tblwifipayment") 
      .then(res => setPayments(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
   <div className="container" style={{ marginTop: '100px' }}>
      <h2 className="text-center mb-4 text-dark"> <i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;&nbsp;All Wifi Payments</h2>
      
      {payments.length > 0 ? (
        <div className="table-responsive shadow rounded">
          <table className="table table-bordered table-hover table-sm text-center">
            <thead className="custom-header">
              <tr>
                <th>ID</th>
                <th>PID</th>
                <th>Wifi ID</th>
                <th>Amount (₹)</th>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Recharge Date</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.pid}</td>
                  <td>{payment.wifiid}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.method}</td>
                  <td>{payment.tid}</td>
                  <td>{payment.rechargeat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No payment records found.
        </div>
      )}
    </div>
  );
};

export default WifiPay;

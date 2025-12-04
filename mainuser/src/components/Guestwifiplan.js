import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect

import Guestdashboard from "./Guestdashboard";
import Footer from "./Footer";

const Guestwifiplan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/tblwifi") // replace with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLoginRedirect = () => {
    navigate("/Insertlogin"); 
  };

  if (loading) return <p className="gvp-loading">Loading plans...</p>;
  if (plans.length === 0)
    return <p className="gvp-no-record">No records found.</p>;

  return (
    <div>
      <Guestdashboard></Guestdashboard>
    <div className="gvp-container">
      <h2 className="gvp-title">
        <i className="fa-solid fa-wifi"></i> Wifi Plans
      </h2>

      <table className="gvp-table table-striped">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Data</th>
            <th>Amount</th>
            <th>Validity</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="gvp-name">{plan.plan_name}</td>
              <td className="gvp-data">{plan.data}</td>
              <td className="gvp-amount">&#8377; {plan.amount}</td>
              <td className="gvp-validity">{plan.validity}</td>
              <td className="gvp-desc">{plan.description}</td>
              <td>
                <button
                  className="btn-login-buy"
                  onClick={handleLoginRedirect}
                >
                  <i className="fa-solid fa-cart-shopping"></i>Buy Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Guestwifiplan;

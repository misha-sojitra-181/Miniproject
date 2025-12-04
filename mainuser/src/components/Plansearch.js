import React, { useState } from "react";
import "./Plansearch.css";
import Userdashboard from "./Userdashboard";
import Footer from "./Footer";

const Plansearch = ({ apiEndpoint }) => {
  const [input, setInput] = useState("");
  const [plans, setPlans] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (isNaN(input) || input.trim() === "") {
      setMessage("Please enter a valid number.");
      setPlans([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: parseFloat(input) }),
      });

      const data = await res.json();
      if (data.length > 0) {
        setPlans(data);
        setMessage("");
      } else {
        setPlans([]);
        setMessage(`No plans found for ₹${input} and above.`);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setMessage("An error occurred. Please try again.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (planid) => {
    window.location.href = `/Paybill?pid=${planid}`;
  };

  return (
    <div className="mv-body">
      <Userdashboard />

      <div className="mv-container">
        <h2 className="mv-title">Search Plans</h2>

        <form className="mv-search" onSubmit={handleSearch}>
          <input
            type="text"
            className="mv-input"
            placeholder="Search plans by minimum price..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ml-2 mt-2">
            Search
          </button>
        </form>

        {loading && <p className="mv-loading">Searching...</p>}
        {message && <p className="mv-no-record">{message}</p>}

        {plans.length > 0 && (
          <table className="mv-table">
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
                <tr key={plan.planid}>
                  <td className="mv-name">{plan.plan_name}</td>
                  <td className="mv-data">{plan.Data}</td>
                  <td className="mv-amount">&#8377; {plan.amount}</td>
                  <td className="mv-validity">{plan.validity}</td>
                  <td className="mv-desc">{plan.description}</td>
                  <td>
                    <button
                      className="btn-login-buy"
                      onClick={() => handleBuy(plan.planid)}
                    >
                      <i className="fas fa-shopping-cart"></i> Buy Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Plansearch;

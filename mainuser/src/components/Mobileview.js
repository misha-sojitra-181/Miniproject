import React, { useEffect, useState } from "react";
import "./Mobileview.css";
import Userdashboard from "./Userdashboard";
import Footer from "./Footer";

const Mobileview = () => {
  const [plans, setPlans] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/tblplan");
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans:", err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced live search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput.trim() === "") {
        setSearchResults([]);
      } else {
        const filtered = plans.filter(
          (plan) => plan.amount >= parseFloat(searchInput.trim())
        );
        setSearchResults(filtered);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, plans]);

  const handleBuy = (planid) => {
    window.location.href = `/Paybill?pid=${planid}`;
  };

  const displayPlans = searchResults.length > 0 || searchInput ? searchResults : plans;

  return (
    <div className="mv-body">
      <Userdashboard />
      <div className="mv-container">
        <h2 className="mv-title">
          <i className="fas fa-mobile-alt"></i> Mobile Plans
        </h2>

        <div className="mv-search">
          <input
            type="text"
            className="mv-input"
            placeholder="Search plans by minimum price..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {loading && <p className="mv-loading">Loading...</p>}

        {!loading && displayPlans.length > 0 ? (
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
              {displayPlans.map((plan) => (
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
        ) : (
          !loading && <p className="mv-no-record">No records found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Mobileview;

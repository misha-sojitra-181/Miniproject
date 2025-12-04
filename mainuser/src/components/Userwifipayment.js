import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Userpayment.css";
import Footer from "./Footer";
import Userdashboard from "./Userdashboard";

const Userwifipayment = () => {
  const [amount, setAmount] = useState(0);
  const [plan_name, setplanname] = useState(0);
  const [method, setMethod] = useState("");
  const [tid, setTid] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const [searchParams] = useSearchParams();
  const wifiId = searchParams.get("pid");
  const navigate = useNavigate();

  // Fetch plan amount and user ID on mount
  useEffect(() => {
    const fetchPlanAndUser = async () => {
      const userEmail = sessionStorage.getItem("userEmail");
      if (!userEmail) {
        alert("Please login first!");
        navigate("/Loginmini");
        return;
      }

      try {
        // Fetch plan info
        const planRes = await fetch(`http://localhost:3001/tblwifi?wifiid=${wifiId}`);
        const planData = await planRes.json();
        if (planData.length > 0) {
          setAmount(planData[0].amount);
          setplanname(planData[0].plan_name);
        } else {
          alert("Plan not found!");
          navigate("/Wifiplan");
          return;
        }

        // Fetch user info
        const userRes = await fetch(`http://localhost:3001/tblregister?email=${userEmail}`);
        const userData = await userRes.json();
        if (userData.length > 0) {
          setUserId(userData[0].id);
        } else {
          alert("User not found!");
          navigate("/Loginmini");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to fetch data. Please try again.");
      }
    };

    fetchPlanAndUser();
  }, [wifiId, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!method || !tid) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      const paymentData = {
        id: userId,
        wifiid: wifiId,
        plan_name:plan_name,
        amount,
        method,
        tid,
        rechargeat: new Date().toISOString(), // ✅ Add timestamp
      };

      const res = await fetch("http://localhost:3001/tblwifipayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      
      if (res.ok) {
        alert("Recharge Successful!");
        navigate("/Userfeedback");
      } else {
        setMessage("Recharge failed! Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMessage("Payment request failed. Try again.");
    }
  };

  return (
    <div>
      <Userdashboard />
      <div className="container">
        <div className="row shadow-lg p-4 mt-5 rounded-4 main-row">
          {/* Left Panel */}
          <div className="col-md-5 d-flex flex-column justify-content-center align-items-center text-center p-5">
            <div className="amount-box hover-effect">
              <h3>Total Amount</h3>
              <h1>&#8377; {amount}</h1>
              <p>Includes all taxes and fees</p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-md-7 bg-white bg-opacity-95 rounded-4 p-4 shadow-sm">
            <h2 className="text-center mb-4 text-primary">Complete Your Payment</h2>
            {message && <p className="text-danger text-center">{message}</p>}
            <form onSubmit={handlePayment}>
              <div className="mb-3 text-center">
                <input
                  type="text"
                  value={plan_name}
                  readOnly
                  className="form-control text-center fw-bold border-0 shadow-sm"
                  style={{ width: "80%", margin: "auto" }}
                />
                <input
                  type="text"
                  value={amount}
                  readOnly
                  className="form-control text-center fw-bold border-0 shadow-sm"
                  style={{ width: "80%", margin: "auto" }}
                />
              </div>

              <div className="ms-4">
                {["Credit/Debit Card", "Net Banking", "UPI"].map((option) => (
                  <div className="form-check" key={option}>
                    <input
                      type="radio"
                      id={option}
                      name="pay"
                      value={option}
                      className="form-check-input"
                      onChange={(e) => setMethod(e.target.value)}
                    />
                    <label htmlFor={option} className="form-check-label">
                      {option}
                    </label>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  className="form-control text-center shadow-sm"
                  style={{ width: "80%", margin: "auto" }}
                  value={tid}
                  onChange={(e) => setTid(e.target.value)}
                />
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-bold rounded-pill shadow"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Userwifipayment;

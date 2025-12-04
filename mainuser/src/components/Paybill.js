import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Paybill.css";
import Userdashboard from "./Userdashboard";
import Footer from "./Footer";

const Paybill = () => {
  const [searchParams] = useSearchParams();
  const planid = searchParams.get("pid"); 
  const navigate = useNavigate();

  const [userMobile, setUserMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const fetchUserMobile = async () => {
      try {
        const userEmail = sessionStorage.getItem("userEmail");
        if (!userEmail) {
          alert("Please login first!");
          navigate("/loginmini");
          return;
        }

        const res = await fetch(
          `http://localhost:3001/tblregister?email=${userEmail}`
        );
        const data = await res.json();

        if (data.length > 0) {
          setUserMobile(data[0].mobile);
        } else {
          alert("User not found in database!");
        }
      } catch (err) {
        console.error("Failed to fetch user mobile:", err);
      }
    };

    fetchUserMobile();
  }, [navigate]);

  const handleOtpClick = (e) => {
    e.preventDefault();

    if (!otpSent) {
     
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otp);
      alert(`OTP Sent: ${otp}`);
      setOtpSent(true);
    } else {
      if (otpInput === generatedOtp) {
        navigate(`/Userpayment?pid=${planid}`);
      } else {
        setMessage("Invalid OTP! Please try again.");
      }
    }
  };

  return (
    <div className="bod">
      <Userdashboard />
      <div className="container-fluid">
        <div className="card d-flex flex-lg-row flex-column">
          {/* Left Panel */}
          <div className="col-lg-5 left-panel">
            <h1>
              Instant TopUp Online
              <br />
              Bill Payment
            </h1>
            <p>Let's get your bill payment done !!</p>
            <img src="/Images/doller.png" alt="Bill Icon" />
          </div>

          {/* Right Panel */}
          <div className="col-lg-7 right-panel">
            <form>
              <h2>View & Pay Your Bill</h2>

              {/* Display Plan ID */}
              <p>
                <strong>Plan ID:</strong> {planid || "Not available"}
              </p>

              <label>Registered Mobile Number:</label>
              <input type="text" value={userMobile} readOnly className="form-control" />

              {otpSent && (
                <div className="mt-3">
                  <label htmlFor="otpInput">Enter OTP:</label>
                  <input
                    type="text"
                    id="otpInput"
                    name="otp"
                    placeholder="Enter OTP"
                    className="form-control mt-2"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                </div>
              )}

              {message && <p className="text-danger mt-2">{message}</p>}

              <button className="btn text-white btn-send mt-3" onClick={handleOtpClick}>
                {otpSent ? "Submit OTP" : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Paybill;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginmini.css";

const Loginmini = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // ✅ Email validation
  const validateEmail = (value) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (pattern.test(value)) {
      setEmailMsg("valid");
    } else {
      setEmailMsg("Please enter a valid email");
    }
  };

  // ✅ Login handler for db.json
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields.");
      setStatus("error");
      return;
    }

    try {
      // Fetch all users from db.json
      const res = await fetch("http://localhost:3001/tblregister");
      const users = await res.json();

      // Find matching user
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        setMessage("✅ Login successful! Redirecting...");
        setStatus("success");

        // Simulate session (store email temporarily)
        sessionStorage.setItem("userEmail", user.email);

        
          navigate("/Userprofile");
        
      } else {
        setMessage("❌ Either Email or Password is wrong.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to the Website</h2>
          <p className="subtitle">Connect and explore with us.</p>
        </div>

        <div className="login-body">
          <h3 className="form-title">USER LOGIN</h3>

          {message && <div className={`message ${status}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              <label
                className="lblem"
                style={{ color: emailMsg === "valid" ? "green" : "red" }}
              >
                {emailMsg}
              </label>
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <a href="/Changepaslogin" className="login-link">
                Change password?
              </a>
              <a href="/Forgotpaslogin" className="login-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn">
              LOGIN
            </button>

            <p className="signup-text">
              Don’t have an account?{" "}
              <a href="/Insertlogin" className="signup-link">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginmini;

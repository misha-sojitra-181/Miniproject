import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Changepaslogin.css";

const Changepaslogin = () => {
  const [email, setEmail] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !oldPwd || !newPwd) {
      setMessage("⚠️ Please fill in all fields.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/tblregister?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        setMessage("❌ Email not found.");
        setStatus("error");
        return;
      }

      const user = data[0];

      if (user.password !== oldPwd) {
        setMessage("❌ Old password is incorrect.");
        setStatus("error");
        return;
      }

      const updateRes = await fetch(`http://localhost:3001/tblregister/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPwd }),
      });

      if (updateRes.ok) {
        setMessage("✅ Password changed successfully!");
        setStatus("success");
        
          navigate("/Loginmini");

      } else {
        setMessage("❌ Failed to update password.");
        setStatus("error");
      }
    } catch (err) {
      setMessage("⚠️ Server error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="changepass-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to the Website</h2>
          <p className="subtitle">Connect and explore with us.</p>
        </div>

        <div className="login-body">
          <h3 className="form-title">CHANGE PASSWORD</h3>

          {message && <div className={`message ${status}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter Old Password"
                value={oldPwd}
                onChange={(e) => setOldPwd(e.target.value)}
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <a href="/loginmini" className="login-link">
                Login?
              </a>
            </div>

            <button type="submit" className="login-btn">
              CHANGE PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Changepaslogin;

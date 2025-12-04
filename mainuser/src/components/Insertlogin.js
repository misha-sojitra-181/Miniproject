import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Insertlogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    uname: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "fname":
        if (!/^[a-zA-Z]+(?:[\s'-][a-zA-Z]+){1,}$/.test(value)) {
          return "Please enter your full name (first and last)";
        } else return "";
      case "uname":
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
          return "Username must be 3–20 characters, no spaces or special characters";
        } else return "";
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Please enter a valid email";
        } else return "";
      case "mobile":
        if (!/^\d{10}$/.test(value)) {
          return "Enter a valid 10-digit mobile number";
        } else return "";
      case "password":
      case "cpassword":
        if (formData.password && formData.cpassword && formData.password !== formData.cpassword) {
          return "Passwords do not match";
        } else return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/tblregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMsg("Registered successfully!");
        setFormData({
          fname: "",  
          uname: "",
          email: "",
          mobile: "",
          gender: "",
          dob: "",
          password: "",
          cpassword: "",
        });
        setTimeout(() => navigate("/loginmini"), 2000);
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please check your backend.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
         background: "linear-gradient(to bottom right,  rgb(223, 224, 222),  #b3cdfe)",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "15px",
          overflow: "hidden",
          width: "800px",
          maxWidth: "95%",
          flexWrap: "wrap",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          background: "linear-gradient(to bottom right, #c73dfdff, #111950ff)",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            width: "48%",
            backgroundImage: "url('./images/signupimage.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: "30px", left: "40px", display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="./Images/logo.png" style={{ borderRadius: "50%" }} alt="Logo" width="50" height="50" />
            <h4>Instant TopUp</h4>
          </div>
          <h1 style={{ fontSize: "32px" }}>Welcome Page</h1>
          <p>Sign up to create your account</p>
          <div style={{ position: "absolute", bottom: "30px", left: "40px", fontSize: "14px" }}>www.instanttopup.com</div>
        </div>

        {/* Right Panel */}
        <div style={{ width: "50%", padding: "50px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "30px", color:"white" }}>SIGN UP</h2>

          {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="fname"
                placeholder="Full Name"
                value={formData.fname}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              {errors.fname && <label style={{ color: "red" }}>{errors.fname}</label>}
            </div>

            {/* Username */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="uname"
                placeholder="User Name"
                value={formData.uname}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              {errors.uname && <label style={{ color: "red" }}>{errors.uname}</label>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              {errors.email && <label style={{ color: "red" }}>{errors.email}</label>}
            </div>

            {/* Mobile */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              {errors.mobile && <label style={{ color: "red" }}>{errors.mobile}</label>}
            </div>

            {/* Gender */}
            <div style={{ marginBottom: "20px",color:"white" }}>
              <b>Gender: </b>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                required
              /> Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                required
                style={{ marginLeft: "10px" }}
              /> Female
            </div>

            {/* DOB */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                value={formData.cpassword}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "12px 15px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              {errors.password && <label style={{ color: "red" }}>{errors.password}</label>}
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "25px",
                border: "none",
                background: "linear-gradient(to right, #7209b7, #f72585)",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              REGISTER
            </button>

            <div style={{ marginTop: "20px", textAlign: "center", color: "#aaa" }}>
              or You already have account? <span style={{ color: "#f72585", cursor: "pointer" }} onClick={() => navigate("/loginmini")}>Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Insertlogin;

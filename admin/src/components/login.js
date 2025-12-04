import React, { useState } from "react";
import './Login.css'; 
 import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleLogin = function(e) {
    e.preventDefault();

    if(password === "admin123"){  
    navigate('/dashboard');   
    } else {
      alert("Incorrect password");
    }
  };

 

  return React.createElement(
    "div",
    { className: "login-page" }, 
    React.createElement(
      "div",
      { className: "login-card" }, 
      React.createElement(
        "div",
        { className: "login-header" }, 
        React.createElement("h2", null, "Welcome to the Website"),
        React.createElement("p", { className: "subtext" }, "Connect and explore with us."),
        React.createElement("p", { className: "subtext" }, "Only Admin")
      ),
      React.createElement(
        "div",
        { className: "login-body" }, 
        React.createElement("h3", { className: "login-title" }, "ADMIN LOGIN"),
        React.createElement(
          "form",
          { onSubmit: handleLogin },
          React.createElement(
            "div",
            { className: "input-group" },
            React.createElement("i", { className: "fas fa-lock" }),
            React.createElement("input", {
              type: "password",
              value: password,
              onChange: function (e) {
                setPassword(e.target.value);
              },
              placeholder: "Enter your password",
              required: true,
            })
          ),
          React.createElement(
            "div",
            { className: "checkbox-group" },
            React.createElement("label", null,
              React.createElement("input", { type: "checkbox" }),
              " Remember"
            ),
           
          ),
          React.createElement(
            "button",
            { type: "submit", className: "login-btn" },
            "LOGIN"
          )
        )
      )
    )
  );
}

export default Login;

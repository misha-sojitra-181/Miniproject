import React from "react";

const projectName = "Instant TopUp";
const logo = "/Images/logo.png"; // Make sure this image exists in public/images

const menu = [
  { name: "Home", link: "/Guestmain", icon: "fa-solid fa-house" },
  { name: "View Plans", link: "/Guestvplans", icon: "fa-solid fa-list" },
  { name: "WIFI Plans", link: "/Guestwifiplan", icon: "fa-solid fa-wifi" },
  { name: "LogIn", link: "/Loginmini", icon: "fa-solid fa-sign-in-alt" },
];

function GuestDashboard() {
  return (
    <div className="bod">
    <div style={{ display: "flex" }}>
      <div
        className="sidebar"
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          borderRight: "1px solid #ddd",
          padding: "20px",
          overflowY: "auto",
          overflowX: "hidden",
          position: "fixed",
        }}
      >
        <div className="logo" style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
          <h4 style={{ fontSize: "22px", color: "#16009e", marginTop: "10px" }}>
            {projectName}
          </h4>
        </div>

        <a href="/Insertlogin" className="btn btn-outline-primary btn-block mb-3">
          <i className="fa-solid fa-user"></i> Create Profile
        </a>

        <nav className="nav flex-column">
          {menu.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="nav-link"
              style={{
                color: "#05337e",
                margin: "5px 0",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "2px 2px 4px #ddd",
              }}
            >
              <i className={item.icon}></i> {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="content" style={{ flexGrow: 1, padding: "20px", marginLeft: "250px" }}>
        {/* Main content goes here */}
      </div>
    </div>
    </div>
  );
}

export default GuestDashboard;

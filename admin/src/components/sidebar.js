import React from "react";
import './sidebar.css';

import { Link } from 'react-router-dom';

const menu = [
  { name: "Home", link: "/dashboard", icon: "fa-solid fa-house" },
  { name: "View Plans", link: "/Homem", icon: "fa-solid fa-list" },
  { name: "WIFI Connectivity", link: "/Homew", icon: "fa-solid fa-wifi" },
  { name: "MobilePayment", link: "/Mobilep", icon: "fa-solid fa-credit-card" },
  { name: "WIFI Payment", link: "/Wifip", icon: "fa-solid fa-credit-card" },
  { name: "User Profile", link: "/Viewuser", icon: "fa-solid fa-user" },
  { name: "Logout", link: "/", icon: "fa-solid fa-right-from-bracket" },

];
const logo = "/Images/logo.png";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" width="100" height="100" />
        <h4>Instant TopUp</h4>
      </div>

    
      

    <nav className="nav flex-column">
      {menu.map((item, index) => (
        <Link key={index} className="nav-link" to={item.link}>
          <i className={item.icon}></i> {item.name}
        </Link>
      ))}
    </nav>

    </div>
  );
}

export default Sidebar;

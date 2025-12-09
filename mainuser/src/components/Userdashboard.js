

const projectName = "Instant TopUp";
const logo = "/Images/logo.png"; // Make sure this image exists in public/images

const menu = [
  { name: "Home", link: "/Mainuser", icon: "fa-solid fa-house" },
  { name: "View Plans", link: "/Mobileview", icon: "fa-solid fa-list" },
  { name: "WIFI Connectivity", link: "/Wifiplan", icon: "fa-solid fa-wifi" },
  { name: "Recharge", link: "/Mobileview", icon: "fa-solid fa-bolt" },
  { name: "Logout", link: "/Guestmain", icon: "fa-solid fa-right-from-bracket" },
];

function Userdashboard() {
  return (
    <div className="bod">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} width="100" height="100" alt="logo" />
          <h4>{projectName}</h4>
        </div>

        <a href="/Userprofile" className="btn btn-outline-primary mb-3" style={{ width: "100%", textAlign: "center" }}>
          <i className="fa-solid fa-user"></i> Profile
        </a>

        <nav className="nav flex-column">
          {menu.map((item, index) => (
            <a key={index} href={item.link} className="nav-link">
              <i className={item.icon}></i> {item.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="content">
        {/* Your page content */}
      </div>
    </div>
  );
}


export default Userdashboard;


import React, { useEffect, useState } from "react";
import Userdashboard from "./Userdashboard";
import Footer from "./Footer";
import "./Userprofile.css";

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get logged-in user's email from sessionStorage
  const userEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    // Fetch all users from db.json
    fetch("http://localhost:3001/tblregister")
      .then((res) => res.json())
      .then((users) => {
        const currentUser = users.find((u) => u.email === userEmail);
        if (currentUser) {
          setUser(currentUser);
        } else {
          setError("No records found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  const photoPath = user.Photo || user.photo ||  "/images/person.jpg"; ;

  return (
    <div>
      <Userdashboard />
    <div className="profile-wrapper">
      <div
        className="container profile-container  p-0"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 0 40px rgba(147, 51, 234, 0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 0 25px rgba(59, 130, 246, 0.5)";
        }}
      >
        {/* Left Side */}
        <div className="profile-left">
          <img src={photoPath} alt="Profile" />
          <h3>{user.uname}</h3>
          <p>{user.email}</p>
          <div className="social-icons">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>

        {/* Right Side */}
        <div className="profile-right">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="/Userprofile">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Edituserprofile">
                Edit Profile
              </a>
            </li>
          </ul>

          <h4 className="section-title">About</h4>
          <p className="about-text">
            Instant TopUp makes mobile recharges fast, easy, and secure. Whether you're topping up your own phone or sending credit to friends and family,
            our platform ensures instant delivery and reliable service—anytime, anywhere.
          </p>

          <h4 className="section-title mt-4">Profile Details</h4>
          <table className="table table-borderless mt-3">
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>:</td>
                <td>
                  <b>{user.fname}</b>
                </td>
              </tr>
              <tr>
                <td>User Name</td>
                <td>:</td>
                <td>
                  <b>{user.uname}</b>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>
                  <b>{user.email}</b>
                </td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>:</td>
                <td>
                  <b>{user.mobile}</b>
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>:</td>
                <td>
                  <b>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</b>
                </td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>:</td>
                <td>
                  <b>{user.dob}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default Userprofile;


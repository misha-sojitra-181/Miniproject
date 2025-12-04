import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Edituserprofile.css"; 
import Footer from "./Footer";
import Userdashboard from "./Userdashboard";

const Edituserprofile = () => {
  const defaultPhoto = "/images/person.jpg"; // fallback image
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    uname: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    photo: "",
    imageFile: null,
  });

  // ✅ Get logged-in user's email from sessionStorage
  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("userEmail"); // dynamic
    if (!loggedInEmail) {
      alert("You are not logged in.");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3001/tblregister?email=${encodeURIComponent(loggedInEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const currentUser = data[0];
          setUser(currentUser);
          setFormData({
            fname: currentUser.fname,
            uname: currentUser.uname,
            email: currentUser.email,
            mobile: currentUser.mobile,
            gender: currentUser.gender,
            dob: currentUser.dob,
            photo: currentUser.Photo || "",
            imageFile: null,
          });
        }
      })
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, imageFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...formData,
      Photo: formData.imageFile
        ? URL.createObjectURL(formData.imageFile) // preview only
        : formData.photo,
    };

    fetch(`http://localhost:3001/tblregister/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        alert("Profile updated successfully!");
        navigate("/Userprofile"); // go back to profile
      })
      .catch((err) => console.error(err));
  };

  if (!user) return <p style={{ textAlign: "center" }}>Loading user...</p>;

  return (
    <div className="bod">
      <Userdashboard />
    <div className="profile-wrapper">
      <div
        className="profile-container"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 0 40px rgba(147, 51, 234, 0.6)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 0 25px rgba(59, 130, 246, 0.5)";
        }}
      >
        {/* Left Section */}
        <div className="profile-left">
          <img
            src={
              formData.imageFile
                ? URL.createObjectURL(formData.imageFile)
                : user.Photo || defaultPhoto
            }
            alt={`${user.uname}'s profile`}
          />
          <h3>{user.uname}</h3>
          <p>{user.email}</p>
          <div className="social-icons">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>

        {/* Right Section */}
        <div className="profile-right">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a className="nav-link" href="/userprofile">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/edituserprofile">
                Edit Profile
              </a>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Profile Image</label>
              <br />
              <img
                src={
                  formData.imageFile
                    ? URL.createObjectURL(formData.imageFile)
                    : user.Photo || defaultPhoto
                }
                alt={`${user.uname}'s profile`}
                height="100"
                width="100"
                style={{ borderRadius: "10px" }}
              />
              <input
                type="file"
                className="form-control mt-2"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>User Name</label>
              <input
                type="text"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>

            <div className="mb-3">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn text-white">
              Update
            </button>
          </form>
        </div>
      </div>
</div>
      <Footer />
    </div>
  );
};

export default Edituserprofile;

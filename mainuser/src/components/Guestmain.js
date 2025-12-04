import React from "react";
import GuestDashboard from "./Guestdashboard";
import "./Guestmain.css";
import Footer from "./Footer";

export default function Guestmain() {
  const carouselImages = [
    "h4.png",
    "r6.jpg",
    "h3.png",
    "h5.jpg",
    "r8.png",
    "r9.jpg",
  ];

  const services = [
    {
      icon: "fa-lock",
      title: "Secure Payment",
      desc: "Fast and secure payment gateway to protect transactions.",
    },
    {
      icon: "fa-key",
      title: "Password Facility",
      desc: "Manage passwords and accounts easily and safely.",
    },
    {
      icon: "fa-bolt",
      title: "Instant Recharge",
      desc: "Instant top-up for mobile, Wifi and more.",
    },
  ];

  const team = [
    { name: "Shruti Golakiya", img: "shruti1.jpg" },
    { name: "Misha Sojitra", img: "mishu.jpg" },
    { name: "Dhruvi Sojitra", img: "dhruvi.jpg" },
  ];

  return (
    <div className="guest-main-wrapper" style={{ display: "flex" }}>
      <GuestDashboard />

      {/* Main content */}
      <div className="content" style={{ flexGrow: 1, padding: "20px" }}>
        {/* Hero Carousel */}
        <section className="hero-carousel">
          <div
            id="homeCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="4000"
          >
            <div className="carousel-inner">
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`/Images/${img}`}
                    alt={`Slide ${index + 1}`}
                    className="d-block w-100 carousel-img"
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        {/* Services */}
        <section className="services text-center">
          <h2>Our Services</h2>
          <div className="row justify-content-center">
            {services.map((service, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                <div className="service-card p-4">
                  <div className="service-icon">
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <h5>{service.title}</h5>
                  <p className="small text-muted">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="team">
          <h2 className="text-center mb-5">Meet Our Team</h2>
          <div className="row g-4 justify-content-center">
            {team.map((member, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                <div className="team-card">
                  <img
                    src={`/images/${member.img}`}
                    alt={member.name}
                    className="team-img"
                  />
                  <div className="p-3 text-center team-name">
                    <h6 className="mb-0 text-black">{member.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer></Footer>
      </div>
      
    </div>
  );
}

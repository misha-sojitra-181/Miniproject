import React from "react";
import "./Footer.css";

export default function Footer() {
    const logo = "/Images/logo.png";
  return (
    <footer>
      <img src={logo} id="logo" alt="Logo" />
      <br />
      <h3 className="mt-2 mb-3 text-warning">Instant TopUP</h3>
      <p>
        ⚡ Instant Recharges, Anytime, Anywhere.
        <br />
        🔒 Safe Payments, Instant Confirmation.
        <br />
        🤝 Trusted by Thousands, Powered for You.
      </p>

      <hr style={{ backgroundColor: "white", width: "100%" }} />

      <table className="footer-table mx-auto text-center">
        <tbody>
          <tr>
            <td className="text-warning"><b>Our Services</b></td>
            <td className="text-warning"><b>About Us</b></td>
            <td className="text-warning"><b>Contact Info</b></td>
          </tr>
          <tr>
            <td><a href="/Guestvplans">Mobile Plans</a></td>
            <td><a href="/Guestmain">About Us</a></td>
            <td>📞 +91 96754 36788</td>
          </tr>
          <tr>
            <td><a href="/Guestwifiplan">Wi-Fi Plans</a></td>
            <td><a href="/Insertlogin">Sign Up</a></td>
            <td>✉️ instanttopup@gmail.com</td>
          </tr>
          <tr>
            <td><a href="/Paybill">Payment</a></td>
          </tr>
        </tbody>
      </table>

      <hr style={{ backgroundColor: "white", width: "100%" }} />

      <p>Join to get exclusive offers & plan discounts</p>
      <form className="d-inline-flex justify-content-center">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Enter your registered email"
          required
        />
        <button type="submit" className="join-btn btn-dark ms-2">
          Join
        </button>
      </form>

      <marquee>
        Welcome to our Instant TopUp. Have a nice day. Thank you! 😊
      </marquee>
    </footer>
  );
};

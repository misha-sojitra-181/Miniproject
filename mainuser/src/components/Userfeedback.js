import React, { useEffect, useState } from "react";
import "./Userfeedback.css";
import Footer from "./Footer";
import Userdashboard from "./Userdashboard";
import { useNavigate } from "react-router-dom";

const Userfeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchUser = async () => {
      const email = sessionStorage.getItem("userEmail");
      if (!email) {
        alert("Please login first!");
        window.location.href = "/loginmini";
        return;
      }

      try {
        const res = await fetch(`http://localhost:3001/tblregister?email=${email}`);
        const data = await res.json();
        if (data.length > 0) {
          setUserId(data[0].id);
        } else {
          alert("User not found!");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage("Please write your feedback before submitting!");
      return;
    }

    if (!userId) {
      setMessage("User not found!");
      return;
    }

    const feedbackData = {
      id: userId,
      feedback,
      rating,
    };

    try {
      const res = await fetch("http://localhost:3001/tblfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      if (res.ok) {
        alert("Thank you for your valuable feedback!");
        setFeedback("");
        setRating(0);
        setMessage("");
        navigate("/Mainuser");
      } else {
        setMessage("Failed to submit feedback. Try again!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later!");
    }
  };

  return (
    <div className="bo">
      <Userdashboard></Userdashboard>
      <div className="feedback-page">
        <div className="feedback-container">
          <center><h2 class="mb-5">Share Your Feedback</h2></center>

          {message && <p className="text-danger text-center">{message}</p>}

          <div className="row">
  <div className="col-md-3 emoji-col text-center mb-5" style={{ marginTop: "-30px" }}>
    <img src="./Images/Green.png" alt="Happy" width="90px" />
    <img src="./Images/Yellow.png" alt="Neutral" width="90px" />
    <img src="./Images/Red.png" alt="Sad" width="90px" />
  </div>
</div>

            {/* Feedback Form */}
            <div className="col-md-9">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <textarea
                    name="feedback"
                    placeholder="Share your experience..."
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  ></textarea>
                </div>

                <p>
                  <strong>Rate Your Experience:</strong>
                </p>
                <div className="rating-stars mb-3">
                  {stars.map((star) => (
                    <img
                      key={star}
                      src={
                        rating >= star
                          ? "./Images/Yellow Star.png"
                          : "./Images/Gray Star.png"
                      }
                      width="45px"
                      alt={`star-${star}`}
                      onClick={() => setRating(star)}
                      style={{ cursor: "pointer", transition: "0.3s" }}
                    />
                  ))}
                </div>

                <button type="submit" className="btnsubmit">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Userfeedback;

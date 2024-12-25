import React, { useState } from "react";
import axios from "axios";
import "../styles/feedback.css"; // Ensure the path matches the location of your CSS file

const FeedbackForm = ({ conferenceId }) => {
  const [formData, setFormData] = useState({ comment: "", rating: 5 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/feedback", { ...formData, conferenceId });
      alert("Feedback submitted successfully");
    } catch (error) {
      alert("Feedback submission failed: " + error.response.data.error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <textarea
          name="comment"
          placeholder="Comment"
          onChange={handleChange}
          className="feedback-comment"
          required
        />
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          onChange={handleChange}
          className="feedback-rating"
          required
        />
        <button type="submit" className="feedback-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

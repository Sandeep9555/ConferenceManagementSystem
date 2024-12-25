const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  conferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conference",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);

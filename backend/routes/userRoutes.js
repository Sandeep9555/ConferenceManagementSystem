const express = require("express");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Conference = require("../models/Conference");

// User Registration API
userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// User Login API
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    console.log(email, password, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET || "JWT_SECRET=mynameisSandeep",
        { expiresIn: "1h" }
      );
      res.json({
        message: "User logged in successfully",
        token,
        user,
      });
    } else {
      res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// View Conferences API
userRoute.get("/conferencelist", async (req, res) => {
  try {
    // Fetch all conferences from the database
    const conferences = await Conference.find();

    // If no conferences are found, return an error
    if (!conferences || conferences.length === 0) {
      return res.status(404).json({
        error: "No conferences found",
      });
    }

    // Return the list of conferences
    res.json(conferences);
  } catch (err) {
    // Handle any errors that occur during the database query
    res.status(500).json({
      error: err.message,
    });
  }
});

// Submit Feedback API
userRoute.post("/feedback", async (req, res) => {
  try {
    const { conferenceId, comment, rating } = req.body;
    if (!conferenceId || !comment || !rating) {
      return res.status(400).json({
        error: "Please fill all the fields",
      });
    }
    const feedback = new Feedback({
      conferenceId,
      comment,
      rating,
    });
    await feedback.save();
    res.json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = userRoute;

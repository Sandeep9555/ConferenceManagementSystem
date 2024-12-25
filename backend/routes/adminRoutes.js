const express = require("express");
const adminRoutes = express.Router();

const Conference = require("../models/Conference");

//Create a new Conferece
adminRoutes.post("/conferences", async (req, res) => {
  try {
    const conference = new Conference(req.body);
    await conference.save();
    res.json({
      message: "Conference created successfully",
      conference,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

//Update Conference details

adminRoutes.put("/conferences/:id", async (req, res) => {
  try {
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!conference) {
      return res.status(404).json({
        error: "Conference not found",
      });
    }
    res.json({
      message: "Conference updated Successafully",
      conference,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

adminRoutes.delete("/conferences/:id", async (req, res) => {
  try {
    const conference = await Conference.findByIdAndDelete(req.params.id); // Corrected re.params.id to req.params.id
    if (!conference) {
      return res.status(404).json({
        error: "Conference not found",
      });
    }
    res.json({
      message: "Conference deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = adminRoutes;

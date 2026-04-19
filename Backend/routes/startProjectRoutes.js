const express = require("express");
const router = express.Router();
const StartProject = require("../models/StartProject");

// Add new project enquiry
router.post("/add", async (req, res) => {
  try {
    const data = new StartProject(req.body);
    await data.save();
    res.status(200).json({ message: "Project enquiry submitted successfully" });
  } catch (err) {
    console.error("Error creating project enquiry:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get all project enquiries
router.get("/", async (req, res) => {
  try {
    const projects = await StartProject.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching project enquiries:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

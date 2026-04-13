const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Application = require("../models/CareerApplication");

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/resumes"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Submit Application
router.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.resume = req.file.filename; // store only the filename
    }

    const app = await Application.create(data);
    res.json({ success: true, app });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Get All Applications
router.get("/", async (req, res) => {
    try {
        const apps = await Application.find().sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

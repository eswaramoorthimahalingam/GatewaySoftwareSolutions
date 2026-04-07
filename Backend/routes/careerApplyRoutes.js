const express = require("express");
const router = express.Router();
const Application = require("../models/CareerApplication");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("resumes");

// Submit Application
router.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Resume file is required" });
    }

    const data = {
      ...req.body,
      coverLetter: req.body.coverLetter || req.body.message || "",
      resume: buildUploadPath("resumes", req.file.filename)
    };

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

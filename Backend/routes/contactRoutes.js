const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Contact = require("../models/Contact");

// Storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/contact_files"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Add a new contact submission
router.post("/add", upload.single("file"), async (req, res) => {
    try {
        const data = req.body;
        if (req.file) data.file = "/uploads/contact_files/" + req.file.filename;

        const contact = await Contact.create(data);
        res.json({ success: true, contact });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get all contact submissions
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, contacts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

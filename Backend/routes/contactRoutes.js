const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("contact_files");

// Add a new contact submission
router.post("/add", upload.single("file"), async (req, res) => {
    try {
        const data = req.body;
        if (req.file) data.file = buildUploadPath("contact_files", req.file.filename);

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

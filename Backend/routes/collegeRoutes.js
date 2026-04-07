const express = require("express");
const router = express.Router();
const College = require("../models/College");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("college-logos");

// Add College
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "College logo is required" });
        }

        const college = new College({
            name: req.body.name,
            location: req.body.location,
            type: req.body.type,
            image: buildUploadPath("college-logos", req.file.filename)
        });
        await college.save();
        res.json({ success: true, message: "College added!", college });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Get All Colleges
router.get("/", async (req, res) => {
    try {
        const college = await College.find();
        res.json(college);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete College
router.delete("/:id", async (req, res) => {
    try {
        await College.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "College deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update College
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updated = {
            name: req.body.name,
            location: req.body.location,
            type: req.body.type
        };

        if (req.file) updated.image = buildUploadPath("college-logos", req.file.filename);

        await College.findByIdAndUpdate(req.params.id, updated);
        res.json({ success: true, message: "College updated!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

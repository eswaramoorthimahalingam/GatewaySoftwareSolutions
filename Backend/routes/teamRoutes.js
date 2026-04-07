const express = require("express");
const router = express.Router();
const TeamMember = require("../models/Team");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("team-members");

// Add Team Member
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Team member image is required" });
        }

        const member = new TeamMember({
            name: req.body.name,
            role: req.body.role,
            order: req.body.order,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            image: buildUploadPath("team-members", req.file.filename)
        });
        await member.save();
        res.json({ success: true, message: "Team member added!", member });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Get all members
router.get("/", async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get a single member
router.get("/:id", async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        res.json(member);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update member
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updated = {
            name: req.body.name,
            role: req.body.role,
            order: req.body.order,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram
        };

        if (req.file) {
            updated.image = buildUploadPath("team-members", req.file.filename);
        }

        await TeamMember.findByIdAndUpdate(req.params.id, updated);
        res.json({ success: true, message: "Team member updated!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete member
router.delete("/:id", async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Team member deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

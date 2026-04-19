const express = require("express");
const router = express.Router();
const multer = require("multer");
const TeamMember = require("../models/Team");

const storage = multer.diskStorage({
    destination: "./uploads/team-members/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// GET all team members
router.get("/", async (req, res) => {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
});

// GET single member by ID
router.get("/:id", async (req, res) => {
    const member = await TeamMember.findById(req.params.id);
    res.json(member);
});

// ADD new team member
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, error: "Image is required" });
        }
        const member = new TeamMember({
            name: req.body.name,
            role: req.body.role,
            order: req.body.order,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            image: "/uploads/team-members/" + req.file.filename
        });
        await member.save();
        res.json({ success: true, message: "Team member added!", member });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// UPDATE team member (PUT) - JSON
router.put("/:id", async (req, res) => {
    try {
        const updated = {
            name: req.body.name,
            role: req.body.role,
            order: req.body.order,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram
        };

        await TeamMember.findByIdAndUpdate(req.params.id, updated);
        res.json({ success: true, message: "Team member updated!" });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// UPDATE with image (POST with multipart)
router.post("/edit/:id", upload.single("image"), async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            role: req.body.role,
            order: req.body.order,
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram
        };

        if (req.file) {
            updateData.image = "/uploads/team-members/" + req.file.filename;
        }

        await TeamMember.findByIdAndUpdate(req.params.id, updateData);
        res.json({ success: true, message: "Team member updated!" });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// DELETE team member
router.delete("/:id", async (req, res) => {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Team member deleted!" });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Project = require("../models/Projects");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("projects");

// ADD PROJECT
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Project image is required" });
        }

        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category, // "web", "mobile", "ecommerce" etc.
            tags: JSON.parse(req.body.tags || "[]"),
            image: buildUploadPath("projects", req.file.filename)
        });

        await project.save();
        res.json({ success: true, message: "Project added!", project });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// GET ALL PROJECTS
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Project deleted!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// UPDATE PROJECT
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updated = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            tags: JSON.parse(req.body.tags || "[]")
        };

        if (req.file) {
            updated.image = buildUploadPath("projects", req.file.filename);
        }

        await Project.findByIdAndUpdate(req.params.id, updated);
        res.json({ success: true, message: "Project updated!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

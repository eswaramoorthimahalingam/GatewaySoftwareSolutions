const express = require("express");
const router = express.Router();
const multer = require("multer");
const Project = require("../models/Projects");

// Multer Storage
const storage = multer.diskStorage({
    destination: "./uploads/projects/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ADD PROJECT
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category, // "web", "mobile", "ecommerce" etc.
            tags: JSON.parse(req.body.tags),
            image: "/uploads/projects/" + req.file.filename
        });

        await project.save();
        res.json({ success: true, message: "Project added!", project });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// GET ALL PROJECTS
router.get("/", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project deleted!" });
});

// UPDATE PROJECT
router.put("/:id", upload.single("image"), async (req, res) => {
    const updated = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        tags: JSON.parse(req.body.tags)
    };

    if (req.file) {
        updated.image = "/uploads/projects/" + req.file.filename;
    }

    await Project.findByIdAndUpdate(req.params.id, updated);
    res.json({ success: true, message: "Project updated!" });
});

module.exports = router;

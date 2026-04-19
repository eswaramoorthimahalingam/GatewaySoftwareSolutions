const express = require("express");
const router = express.Router();
const College = require("../models/College");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./uploads/college-logos/",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Add College
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const college = new College({
            name: req.body.name,
            location: req.body.location,
            type: req.body.type,
            image: "/uploads/college-logos/" + req.file.filename
        });
        await college.save();
        res.json({ success: true, message: "College added!", college });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Get All Colleges
router.get("/", async (req, res) => {
    const college = await College.find()
    res.json(college);
});

// Delete College
router.delete("/:id", async (req, res) => {
    await College.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "College deleted!" });
});

// Update College
router.put("/:id", upload.single("image"), async (req, res) => {
    const updated = {
        name: req.body.name,
        location: req.body.location,
        type: req.body.type
    };

    if (req.file) updated.image = "/uploads/college-logos/" + req.file.filename;

    await College.findByIdAndUpdate(req.params.id, updated);
    res.json({ success: true, message: "College updated!" });
});

module.exports = router;

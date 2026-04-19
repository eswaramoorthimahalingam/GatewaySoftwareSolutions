const express = require("express");
const Career = require("../models/Career");
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const career = await Career.create(req.body);
        res.json({ success: true, career });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const careers = await Career.find().sort({ createdAt: -1 });
        res.json(careers);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        res.json(career);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Career
router.put("/:id", async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, career });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete Career
router.delete("/:id", async (req, res) => {
    try {
        await Career.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Career Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const ProjectEnquiry = require("../models/ProjectEnquiry");


router.post("/add", async (req, res) => {
    try {
        const enquiry = await ProjectEnquiry.create(req.body);

        res.json({
            success: true,
            message: "Project enquiry submitted!",
            enquiry
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const list = await ProjectEnquiry.find().sort({ createdAt: -1 });
        res.json(list);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

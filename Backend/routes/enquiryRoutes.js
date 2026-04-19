const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

router.post("/add", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const enquiry = await Enquiry.create({ name, email, phone, message });

        res.json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiry
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Client = require("../models/Clients");
const multer = require("multer");

// File upload settings
const storage = multer.diskStorage({
    destination: "./uploads/client-logos/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// Add Client
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Client logo is required" });
        }

        const client = new Client({
            name: req.body.name,
            image: "/uploads/client-logos/" + req.file.filename,
        });
        await client.save();
        res.json({ success: true, message: "Client Added", client });
    } catch (err) {
        console.error("Error adding client:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get All Clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (err) {
        console.error("Error fetching clients:", err);
        res.status(500).json({ message: "Failed to fetch clients" });
    }
});

// Delete Client
router.delete("/:id", async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Client Deleted" });
    } catch (err) {
        console.error("Error deleting client:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Client
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updateData = { name: req.body.name };

        if (req.file) {
            updateData.image = "/uploads/client-logos/" + req.file.filename;
        }

        const client = await Client.findByIdAndUpdate(req.params.id, updateData);
        res.json({ success: true, message: "Client Updated", client });
    } catch (err) {
        console.error("Error updating client:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

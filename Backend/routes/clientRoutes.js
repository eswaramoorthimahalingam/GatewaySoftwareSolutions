const express = require("express");
const router = express.Router();
const Client = require("../models/Clients");
const { buildUploadPath, createUploadMiddleware } = require("../utils/uploads");

const upload = createUploadMiddleware("client-logos");

// Add Client
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Client logo is required" });
        }

        const client = new Client({
            name: req.body.name,
            image: buildUploadPath("client-logos", req.file.filename),
        });
        await client.save();
        res.json({ success: true, message: "Client Added", client });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Get All Clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete Client
router.delete("/:id", async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Client Deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update Client
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        const updateData = { name: req.body.name };

        if (req.file) {
            updateData.image = buildUploadPath("client-logos", req.file.filename);
        }

        const client = await Client.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ success: true, message: "Client Updated", client });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;

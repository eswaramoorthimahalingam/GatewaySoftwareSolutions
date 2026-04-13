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
        const client = new Client({
            name: req.body.name,
            image: "/uploads/client-logos/" + req.file.filename,
        });
        await client.save();
        res.json({ success: true, message: "Client Added", client });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// Get All Clients
router.get("/", async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
});

// Delete Client
router.delete("/:id", async (req, res) => {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Client Deleted" });
});

// Update Client
router.put("/:id", upload.single("image"), async (req, res) => {
    const updateData = { name: req.body.name };

    if (req.file) {
        updateData.image = "/uploads/client-logos/" + req.file.filename;
    }

    const client = await Client.findByIdAndUpdate(req.params.id, updateData);
    res.json({ success: true, message: "Client Updated", client });
});

module.exports = router;

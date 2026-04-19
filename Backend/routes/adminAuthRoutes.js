const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();

const JWT_SECRET = "233bb9ee150e98977c93948628317186ce21b41bae605d8f9522271e68ac5b286b6a7a2af7d4b83f1b10f751609e82bdbc25b2f7daa0248be5a1d3a07b7f0b4f"; // Change this for production

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const exists = await Admin.findOne({ email });
        if (exists) return res.status(400).json({ error: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        res.json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ 
            message: "Login successful",
            token 
        });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Reset admin - delete all and create new one
router.post("/reset", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        await Admin.deleteMany({});
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        res.json({ message: "Admin reset successfully", email });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Debug - list all admins (remove in production)
router.get("/debug", async (req, res) => {
    const admins = await Admin.find().select("-password");
    res.json(admins);
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { jwtSecret } = require("../config/appConfig");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

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
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            jwtSecret,
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

module.exports = router;

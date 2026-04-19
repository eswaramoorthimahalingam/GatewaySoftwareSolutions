// routes/menuRoutes.js
const express = require("express");
const Menu = require("../models/Menus");
const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const menu = await Menu.create({
            name: req.body.name,
            path: req.body.path
        });
        res.json({ success: true, menu });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, path: req.body.path },
            { new: true }
        );
        res.json({ success: true, menu });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Menu deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

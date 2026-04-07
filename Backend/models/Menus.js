// models/Menu.js
const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
     path: { type: String, required: true }
});

module.exports = mongoose.model("Menu", MenuSchema);

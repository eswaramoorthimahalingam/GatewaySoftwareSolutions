const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
    title: String,
    urgent: { type: Boolean, default: true },
    exp: String,
    year: String,
    role: String,
    salary: String,
    desc: String,
    perks: String,
    whatsapp: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Career", CareerSchema);

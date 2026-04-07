const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    file: { type: String, default: "" }, // File path if uploaded
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);

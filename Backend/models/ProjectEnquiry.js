const mongoose = require("mongoose");

const ProjectEnquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    projectType: { type: String, required: true },
    budget: { type: String, default: "" },
    timeline: { type: String, default: "" },
    description: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProjectEnquiry", ProjectEnquirySchema);

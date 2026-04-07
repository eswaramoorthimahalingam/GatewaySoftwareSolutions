const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    jobId: String,
    jobTitle: String,
    name: String,
    email: String,
    phone: String,
    coverLetter: String,
    resume: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CareerApplication", ApplicationSchema);

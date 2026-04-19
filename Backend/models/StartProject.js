const mongoose = require("mongoose");

const StartProjectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    service: String,
    budget: String,
    timeline: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("StartProject", StartProjectSchema);

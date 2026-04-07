const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    mail: { type: String },
    age: { type: Number },
    sex: { type: String },

    address: { type: String },

    collegeName: { type: String },
    degree: { type: String },
    passoutYear: { type: String },
    skills: { type: String },

    requirement: [{ type: String }],   // checkbox array
    position: [{ type: String }],      // checkbox array

    interest: { type: String },
    references: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InternEnquiry", enquirySchema);

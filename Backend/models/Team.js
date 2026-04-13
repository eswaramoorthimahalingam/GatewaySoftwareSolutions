const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    linkedin: { type: String, default: "" },
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("TeamMember", TeamMemberSchema);

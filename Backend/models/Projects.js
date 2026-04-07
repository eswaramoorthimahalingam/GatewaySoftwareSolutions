const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,   // web, mobile, ecommerce, ai, etc.
    tags: [String],
    image: String
});

module.exports = mongoose.model("Project", ProjectSchema);

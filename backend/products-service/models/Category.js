const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    emoji: String,
    description: String,
    slug: { type: String, required: true, unique: true },
    image: String, // URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);

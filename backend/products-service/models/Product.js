const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    size: String,
    finish: String, // 'Blanco', 'Gris', 'Negro', 'Pintado a mano'
    stock: { type: Number, default: 0 },
    category: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

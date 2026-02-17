const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: String,
        address: String,
        city: String,
        paymentMethod: String
    },
    items: [{
        productId: String, // ID from products service or generated ID for custom
        name: String,
        size: String,
        finish: String,
        price: Number,
        quantity: Number,
        type: { type: String, enum: ['stock', 'custom'] },
        images: [String] // Array of filenames/urls specific to this item (if applicable)
    }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['Pendiente', 'En Proceso', 'Completado', 'Cancelado'],
        default: 'Pendiente'
    },
    // Global images for the order if they don't map 1:1 to items easily in the frontend logic,
    // usage depends on how frontend sends them. 
    // For 'custom' keychains, images are usually per item.
    // We will store paths here if they are general, but ideally they are in items.description or similar.
    // Given the requirement: "asociar qué imágenes pertenecen a qué item", we will try to link them.
    orderImages: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

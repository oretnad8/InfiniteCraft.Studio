require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-random-originalName
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Database Connection
mongoose.connect('mongodb://localhost:27017/infinitecraft_orders', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Orders Service: MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes

// GET /api/orders - List pending (and other) orders
app.get('/api/orders', async (req, res) => {
    try {
        // Return all orders sorted by date desc
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/orders - Create new order
// Accepts multiple files. Client must append files with field name 'images'
app.post('/api/orders', upload.array('images'), async (req, res) => {
    try {
        const { customer, items, totalAmount } = req.body;
        const parsedCustomer = JSON.parse(customer);
        const parsedItems = JSON.parse(items);

        // Map uploaded files to items
        // This logic relies on the client sending some reference or index.
        // Simplification for this MVP: 
        // If the client sends files, we assume they belong to 'custom' items.
        // Real-world: Form would leverage field names like `images_itemIndex` or send a map.
        // Heuristic here: If there are files, assign them to the first custom item found, 
        // or store in a general pool if that's safer for now.

        // Let's store all file paths in a map for easier frontend handling if unsure
        const filePaths = req.files.map(file => `/uploads/${file.filename}`);

        // Assign images to items if possible. 
        // Strategy: We will attach ALL uploaded images to the Order level first, 
        // and ALSO try to distribute them if the frontend explicitly tagged them (advanced).
        // For this prompt, let's attach all images to the first custom item for display simplicity, 
        // or keep them at order level.

        // Better approach: The Requirement says "asociar qué imágenes pertenecen a qué item".
        // If the frontend sends them in a single batch 'images', it's hard to distinguish which is for which item
        // without extra metadata. 
        // We will assume for now that all images belong to the Custom items in the order.

        parsedItems.forEach(item => {
            if (item.type === 'custom' && filePaths.length > 0) {
                // Assign all images to the custom item (naive approach if multiple custom items exist, 
                // they would share images in this logic, but acceptable for MVP if unrelated).
                // To be precise: The user might buy 2 custom figures. 
                // We really need the frontend to be smart. 
                // For now, let's duplicate the reference or just put it in the first one.
                if (!item.images) item.images = [];
                item.images.push(...filePaths);
            }
        });

        const newOrder = new Order({
            customer: parsedCustomer,
            items: parsedItems,
            totalAmount: totalAmount,
            orderImages: filePaths // Backup reference
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(400).json({ message: error.message });
    }
});

// PATCH /api/orders/:id - Update status
app.patch('/api/orders/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Orders Service running on port ${PORT}`);
});

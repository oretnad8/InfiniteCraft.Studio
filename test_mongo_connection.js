const mongoose = require('mongoose');

// Standard Connection String (Double check this matches what we put in server.js)
const MONGODB_URI = 'mongodb://oretnad8:0C9lhtQ7Pi6XiGJc@infinitecraftstore-shard-00-00.khpi2fk.mongodb.net:27017,infinitecraftstore-shard-00-01.khpi2fk.mongodb.net:27017,infinitecraftstore-shard-00-02.khpi2fk.mongodb.net:27017/infinitecraft_products?ssl=true&replicaSet=atlas-khpi2fk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=InfiniteCraftStore';

console.log('Testing connection to:', MONGODB_URI.replace(/:[^:@]+@/, ':****@')); // Hide password in log

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout faster for testing
})
    .then(() => {
        console.log('✅ Connected to MongoDB!');
        const state = mongoose.connection.readyState;
        console.log('Connection State:', state, '(1 = connected)');

        // Try a write
        const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
        console.log('Attempting write...');
        return new TestModel({ name: 'Ping' }).save();
    })
    .then(() => {
        console.log('✅ Write successful!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection/Write Error:', err);
        process.exit(1);
    });

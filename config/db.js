const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Importing MongoURI from .env file
const mongoURI = process.env.MONGO_URI;

// Setting variable
let dbConnection;

//  Connect to MongoDB using the URI provided in MONGO_URI or locally if no URI is specified
const startDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('📦 Connected to MongoDB');
        dbConnection = true;
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err.message);
        dbConnection = false;
    }
};

//  Close connection with database when server stops
const stopDatabase = async () => {
    await mongoose.disconnect();
    console.log('🛑 Disconnected from MongoDB');
    dbConnection = false;
};

// 
const isConnected = () => {
    return dbConnection;
};

module.exports = { startDatabase, stopDatabase, isConnected };

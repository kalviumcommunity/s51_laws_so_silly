require("dotenv").config()
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI,

const connectToDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to MongoDB');
    } catch (err) {
        console.error(' error connecting to MongoDB:', err.message);
    }
};

const disconnectFromDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('disconnected from MongoDB');
    } catch (err) {
        console.error(' error disconnecting from MongoDB:', err.message);
    }
};

module.exports = {
    connectToDB,
    disconnectFromDB,
    mongooseConnection: mongoose.connection,
};

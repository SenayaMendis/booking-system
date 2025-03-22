const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to database ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
    };

    module.exports = connectDB;

    //DBPass : CH3PprTy59LX0nIj ``
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { databaseURL } = require("../secret");


const db = async(options)=>{
    try {
        await mongoose.connect(databaseURL, options={});
        console.log("Connected to MongoDB");

        mongoose.connection.on('error', (error)=> {
            throw createError(500, "Database connection error", error);
        })
        
    } catch (error) {
        console.error("Database connection error:", error);
        throw createError(500, "Database connection failed");
    }
}

module.exports = db;
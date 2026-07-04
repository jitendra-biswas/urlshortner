const mongoose = require('mongoose');

const connectDB = async function(){
    await mongoose.connect('mongodb://localhost:27017/URLShortner');
    console.log("Mongodb connected!");
}

module.exports = connectDB;
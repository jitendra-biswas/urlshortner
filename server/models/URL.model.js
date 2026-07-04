const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    shortID:String,
    actualURL:String,
    shortURL:String
})

const URLModel = mongoose.model("URL",URLSchema);
module.exports = URLModel;
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


const connectDB = require('../db/db')
const URLModel = require('../models/URL.model')
const shortid = require('shortid');


app.get('/',(req,res)=>{
    res.send("Server is running");
})

app.post('/url', async (req,res)=>{
    const shortID = shortid.generate();
    let {actualURL} = req.body;

    if(!actualURL.startsWith("http://") && !actualURL.startsWith("https://")){
        actualURL ="https://" +  actualURL;
    }
    else{
        actualURL = actualURL;
    }
    shortURL  = "https://urlshortner-jh24.onrender.com/" + shortID;

    const data = await URLModel.create({
        shortID,
        actualURL,
        shortURL
    })
    res.status(200).json(data);
})

app.get("/:shortID",async (req,res)=>{
    const {shortID} = req.params;
    const urlData = await URLModel.findOne({shortID});

    if(!urlData){
        return res.send("Short URL is not found!!");
    }

    res.redirect(urlData.actualURL);
})


connectDB();
module.exports = app;
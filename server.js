const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Skapa en koppling till MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/experience").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
});

//Schema för arbetslivserfarenheter
const ExperienceSchema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: true
    },

    jobtitle: {
        type: String, 
        required: true
    },

    location: {
        type: String, 
        required: true
    },

    startdate: {
        type: Date, 
        required: true
    },

    enddate: {
        type: Date, 
        required: true
    },

    description: {
        type: Date, 
        required: true
    }

});

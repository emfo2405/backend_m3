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

    place: {
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
        type: String, 
        required: true
    }

});

const Jobexperience = mongoose.model("Jobexperience", ExperienceSchema);

//Skapar routes 
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"})
});

//Funktion för att hämta in data från databas
app.get("/jobexperiences", async(req, res) => {
    try{
let result = await Jobexperience.find({});

        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Funktion för att lägga in ny data
app.post("/jobexperiences", async(req,res) => {
    try{
        let result = await Jobexperience.create(req.body);

        return res.json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
})




//Kontroll av server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

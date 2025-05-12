const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    //Hämtar in data från webbplats
    let companyname = req.body.cvcompanyname;
    let jobtitle = req.body.cvjobtitle;
    let place = req.body.cvplace;
    let startdate = req.body.cvstartdate;
    let enddate = req.body.cvenddate;
    let description = req.body.cvdescription;

    let newExperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        place: place,
        startdate: startdate,
        enddate: enddate,
        description: description
    }

        //Struktur för error-meddelanden
        let errors = {
            message: "",
            detail: "",
            https_response: {
    
            }
        };
    
        //Om inte alla fält är ifyllda visas ett felmeddelande
        if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
                    //Error meddelamde
                    errors.message = "Companyname, jobtitle, location, startdate, enddate och description måste vara ifyllda";
                    errors.detail = "Du måste fylla i companyname, jobtitle, location, startdate, enddate och description i JSON";
            
                    //response kod
                    errors.https_response.message = "Bad request";
                    errors.https_response.code = 400;
            
                    res.status(400).json(errors);
            
                    return;
        }

    try{
        let result = await Jobexperience.create(newExperience);

        return res.json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
});




//Kontroll av server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

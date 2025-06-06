const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Skapa en koppling till MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
});

//Schema för arbetslivserfarenheter
const ExperienceSchema = new mongoose.Schema({
    companyName: {
        type: String, 
        required: true
    },

    jobTitle: {
        type: String, 
        required: true
    },

    place: {
        type: String, 
        required: true
    },

    startDate: {
        type: Date, 
        required: true
    },

    endDate: {
        type: Date, 
        required: true
    },

    jobDescription: {
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
    let companyName = req.body.companyName;
    let jobTitle = req.body.jobTitle;
    let place = req.body.place;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let jobDescription = req.body.jobDescription;

    let newExperience = {
        companyName: companyName,
        jobTitle: jobTitle,
        place: place,
        startDate: startDate,
        endDate: endDate,
        jobDescription: jobDescription
    }

        //Struktur för error-meddelanden
        let errors = {
            message: "",
            detail: "",
            https_response: {
    
            }
        };
    
        //Om inte alla fält är ifyllda visas ett felmeddelande
        if(!companyName || !jobTitle || !place || !startDate || !endDate || !jobDescription) {
                    //Error meddelamde
                    errors.message = "Companyname, jobtitle, location, startdate, enddate och description måste vara ifyllda";
                    errors.detail = "Du måste fylla i companyname, jobtitle, place, startdate, enddate och jobdescription i JSON";
            
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

app.put("/jobexperiences/:id", async(req, res) => {
let id = req.params.id;
let { companyName, jobTitle, place, startDate, endDate, jobDescription } = req.body;

try {
    let updatedExperience = await Jobexperience.updateOne({_id: id}, {$set: {companyName, jobTitle, place, startDate, endDate, jobDescription}});

    if(updatedExperience.matchedCount === 0) {
        res.status(404).json({message: "Erfarenheten hittades inte"});
    } 

     res.json({message: "Erfarenheten har uppdaterats", updatedExperience})

    
} catch(error) {
    res.status(400).json({message: "Uppdateringen lyckades inte", error});
}

});

//Funktion för att radera inlägg i databasen
app.delete("/jobexperiences/:id", async(req, res) => {
    id= req.params.id;
    try {
        let deleteExperience = await Jobexperience.deleteOne({_id: id})

        if(deleteExperience.matchedCount === 0) {
            res.status(404).json({message: "Erfarenheten hittades inte"});
        } 
    
         res.json({message: "Erfarenheten har raderats", deleteExperience})
    
        
    } catch(error) {
        res.status(400).json({message: "Raderingen lyckades inte", error});
    }
});


//Kontroll av server
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

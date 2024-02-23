const express = require("express")
// creates a new router object. This router object behaves like a mini-application or middleware system within your main Express application.
const laws = require("../model/Law")
const getData = express.Router()
const postData = express.Router()
const updateData = express.Router()
const  deleteData = express.Router() 

// handle incoming GET requests for /api/data
getData.get("/api/getData", async (req, res) => {
    try {
        const data = await laws.find()
        res.send(data)
        console.log("data retrieved", data)
    } catch (error) {
        console.log(error)
    }
})

postData.post("/api/postData", async (req, res) => {
    try {
        console.log(req.body)
        const { Country, State_Region_if_applicable, Law, Penalty } = req.body
        const newFood = await laws.create({ Country, State_Region_if_applicable, Law, Penalty })
        console.log(newFood)
        res.status(201).json(newFood)
        console.log("postsss")
    } catch (err) {
        console.log(err)
    }
})
// parameters are placeholders in the route pattern, defined by segments prefixed with a colon (:). 
updateData.patch("/api/patchData/:Country", async (req, res) => {
    try {
        const { Country } = req.params;
        const updatedField = req.body;

        // Use your Mongoose model for the database operation
        const updatedLaw = await laws.findOneAndUpdate({ Country }, updatedField, { new: true });

        if (!updatedLaw) {
            return res.status(404).json('No law found');
        }

        console.log(updatedLaw);
        res.status(200).json(updatedLaw);
    } catch (error) {
        res.status(500).json('Something went wrong');
    }
});


deleteData.delete('/api/deleteData/:Country', async (req, res) => {
    const { Country } = req.params
    const deleteField = req.body
    
    const deleteLaw = await laws.findOneAndDelete({ Country }, deleteField, {new: true})
    if(!deleteData)
        return res.status(404).json({error: "Food not deleted"})

    console.log(deleteData)
    res.status(200).json(deleteData)   
})

module.exports = { getData, postData, updateData, deleteData }
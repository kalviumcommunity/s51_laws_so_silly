const express = require("express");
const laws = require("../model/Law");
const router = express.Router();
const updateAndPostJoi = require("../validator");
const authRouter = express.Router()
const users = require("../model/User")
const cookieParser = require("cookie-parser")
// Handle incoming GET requests for /api/data
router.get("/api/getData", async (req, res) => {
    try {
        const data = await laws.find();
        res.send(data);
        console.log("data retrieved", data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/api/postData", async (req, res) => {
    try {
        const { error, value } = updateAndPostJoi(req.body);
        if (error)
            return res.status(400).json(error.details);
        else {
            const { Country, State_Region_if_applicable, Law, Penalty } = req.body;
            const newlaw = await laws.create({ Country, State_Region_if_applicable, Law, Penalty });
            console.log(newlaw);
            res.status(201).json(newlaw);
            console.log("postsss");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.patch("/api/patchData/:Country", async (req, res) => {
    try {
        const { error, value } = updateAndPostJoi(req.body);
        if (error)
            return res.status(400).json(error.details);
        else {
            const { Country } = req.params;
            const updatedField = req.body;
            const updatedLaw = await laws.findOneAndUpdate({ Country }, updatedField, { new: true });
            if (!updatedLaw)
                return res.status(404).json('No law found');
            console.log(updatedLaw);
            res.status(200).json(updatedLaw);
        }
    } catch (error) {
        res.status(500).json('Something went wrong');
    }
});

router.delete('/api/deleteData/:Country', async (req, res) => {
    const { Country } = req.params;
    const deleteLaw = await laws.findOneAndDelete({ Country });
    if (!deleteLaw)
        return res.status(404).json({ error: "Law not deleted" });
    console.log(deleteLaw);
    res.status(200).json(deleteLaw);
});

authRouter.get("/api/getUsers", async(req, res)     => {
    try {
        const data = await users.find()
        res.json(data)
        console.log(data)
    } catch (error) {
        console.log("errror 71", error.message)
    }
})

authRouter.post("/api/login", (req, res) => {
    try{
        res.cookie("username", req.body)
        res.send("username"+req.body)
    }
    catch(error){
        console.log(error.message)
    }
})

authRouter.get("/api/logout", (req, res) => {
    try{
        res.clearCookie("username")
        res.send("Loogged out")
    }
    catch(error){
        console.log("error logging out", error.message)
    }
})

module.exports = {router, authRouter}
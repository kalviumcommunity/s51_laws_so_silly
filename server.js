const express = require('express')
const app = express()
const port = 3000
const { connectToDB } = require("./config/DB")
const connectTodb = async () => {
    try {
        await connectToDB()
        app.listen(port, () => console.log("Server is being listened on", port));
    }
    catch (err) {
        console.error("AN error has occured", err)
    }
}

connectTodb()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/ping', (req, res) => {
    res.json({ messsage: "ping is active" })
})
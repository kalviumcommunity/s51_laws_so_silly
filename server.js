const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const port = 3000;
const { connectToDB } = require("./config/DB");
const { getData, postData, updateData, deleteData } = require('./routes/routes');

// Middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json())

// Routes
app.use("/", getData);
app.use("/", postData);
app.use("/", updateData)
app.use("/", deleteData)
// Connect to the database and start the server
const connectToDbAndStartServer = async () => {
    try {
        await connectToDB();
        app.listen(port, () => console.log("Server is being listened on", port));
    } catch (err) {
        console.error("An error has occurred", err);
    }
}

connectToDbAndStartServer();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/ping', (req, res) => {
    res.json({ message: "Ping is active" });
});

module.exports = app;

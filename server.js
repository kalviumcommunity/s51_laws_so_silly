const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => console.log("port is being listened from the instance of the express"))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/ping', (req, res) => {
    res.json({messsage: "ping is active"})
})
require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    console.log("Hello");
    res.send("Hello from DineEasy Server!");

})

app.listen(port, () => {
    console.log(`DineEasy Server is running from ${port}`);
})

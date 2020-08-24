require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./db")
const recipeBookRouter = require("./routes/recipe-book-router")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/", (req, res) => {
    res.send("This will be the documentation area for the API")
})

app.use("/api", recipeBookRouter)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server stated on ${process.env.SERVER_PORT}`)
})

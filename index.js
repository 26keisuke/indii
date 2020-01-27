import express from "express";
import mongoose from "mongoose";
import keys from "./config/keys";
import bodyParser from "body-parser";

mongoose.connect(keys.mongoURI, err => {
    if (err){
        throw new Error(err)
    } else {
        console.log("DB CONNECTED!")
    }
})

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send({"hi": "there"})
})

app.get("/api/current_user", (req, res) => {
    res.send("")
})

app.post("/api/star_on", (req, res) => {
    res.send("")
})

app.post("/api/star_off", (req, res) => {
    res.send("")
})

app.get("/api/draft/:id", (req, res) => {
    const stub = "<div><p>You Have Finally Done it!!!</p></div>"
    res.send(stub)
})

app.post("/api/draft", (req, res) => {
    console.log(req.body)
    res.send("")
})

app.get("/api/search/:term", (req, res) => {
    console.log(`A term ${req.params.term} has been searched`)
    res.send("")
})



if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, err => {
    if (err) {
        throw new Error(err)
    } else {
        console.log(`LISTENING ON PORT ${PORT}`)
    }
});
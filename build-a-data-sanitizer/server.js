const express= require("express")
const app = express()
const path= require("path")
const { inputCleaner, inputValidator } = require("./middleware")

app.use(express.json())
app.use(express.urlencoded())
app.get("/", (req, res)=>{
    res.redirect("/form")
})

app.get("/form", (req, res)=>{
    const filePath= path.join(__dirname, "public", "index.html")
    res.sendFile(filePath)
})

app.use(express.static(path.join(__dirname, "public")))

app.post("/submit", inputCleaner, inputValidator, (req, res)=>{
    res.json({
        "username": req.body.username,
        "comment": req.body.comment,
    })
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})
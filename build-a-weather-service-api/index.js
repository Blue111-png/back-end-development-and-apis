import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import weatherRouter from "./weather.js"
const app = express()
const PORT= 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/api/info", (req, res)=>{
res.json({
"name": "weather API",
"endpoints": ["/api/weather/:city"]
})
})

app.get("/api/status", (req, res)=>{
    res.status(200).json({
        "status": "200"
    })
})

app.get("/docs", (req, res)=>{
    res.redirect("/api/info")
})

app.get("/api/greet/:name", (req, res)=>{
    const name= req.params.name
    res.json({
        "name": name
    })
})

app.route("/api/data")
.get((req, res)=>{
res.status(200).json()
})
.post((req, res)=>{
    res.status(201).json()
})

app.use("/api/weather", weatherRouter)

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})
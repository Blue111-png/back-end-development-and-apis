import express from "express"
const app = express()
import apiRouter from "./routes/api.routes.js"
import {notFoundHandler, finalErrorHandler} from "./middleware/error.middleware.js"

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use((req, res, next)=>{
    console.log("Request URL:",req.url)
    console.log("Request method:", req.method)
    next()
})

app.use("/api", apiRouter)
app.use(notFoundHandler)
app.use(finalErrorHandler)
app.listen(3000, ()=>{
    console.log("Server running on  http://localhost:3000")
})